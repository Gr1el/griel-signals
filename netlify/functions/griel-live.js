const API_BASE = 'https://v3.football.api-sports.io';
const API_TIMEOUT_MS = 9000;

class UpstreamError extends Error {
  constructor(message, status = 502, quota = null) {
    super(message);
    this.name = 'UpstreamError';
    this.status = status;
    this.quota = quota;
  }
}

function cacheHeaders(ttl = 0) {
  const base = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store, max-age=0',
    'Pragma': 'no-cache',
    'X-Content-Type-Options': 'nosniff'
  };

  if (ttl > 0) {
    base['Netlify-CDN-Cache-Control'] = `public, durable, s-maxage=${ttl}, must-revalidate`;
    base['Netlify-Vary'] = 'query';
  }

  return base;
}

function json(statusCode, body, ttl = 0) {
  return {
    statusCode,
    headers: cacheHeaders(ttl),
    body: JSON.stringify(body)
  };
}

function readQuota(headers) {
  const toNumber = value => {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };

  return {
    dailyLimit: toNumber(headers.get('x-ratelimit-requests-limit')),
    dailyRemaining: toNumber(headers.get('x-ratelimit-requests-remaining')),
    minuteLimit: toNumber(headers.get('x-ratelimit-limit')),
    minuteRemaining: toNumber(headers.get('x-ratelimit-remaining'))
  };
}

async function apiFetch(path) {
  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) {
    throw new UpstreamError('API_FOOTBALL_KEY não configurada na Netlify.', 500);
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': apiKey,
        'accept': 'application/json'
      },
      signal: AbortSignal.timeout(API_TIMEOUT_MS)
    });
  } catch (error) {
    const message = error?.name === 'TimeoutError'
      ? 'Tempo limite excedido ao consultar o provedor.'
      : `Falha de rede ao consultar o provedor: ${error.message}`;
    throw new UpstreamError(message, 504);
  }

  const quota = readQuota(response.headers);
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new UpstreamError(`Resposta inválida do provedor (HTTP ${response.status}).`, 502, quota);
  }

  const errors = payload?.errors;
  const hasErrors = Array.isArray(errors)
    ? errors.length > 0
    : errors && typeof errors === 'object'
      ? Object.keys(errors).length > 0
      : Boolean(errors);

  if (!response.ok || hasErrors) {
    const apiMessage = typeof errors === 'string'
      ? errors
      : hasErrors
        ? JSON.stringify(errors)
        : `HTTP ${response.status}`;

    throw new UpstreamError(
      `API-FOOTBALL: ${apiMessage}`,
      response.status === 429 ? 429 : 502,
      quota
    );
  }

  return { payload, quota };
}

function fixtureId(query) {
  const value = Number(query?.fixture ?? query?.id);
  return Number.isInteger(value) && value > 0 ? value : null;
}

function teamId(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function mergeQuota(...quotas) {
  const valid = quotas.filter(Boolean);
  if (!valid.length) return null;
  const numbers = key => valid.map(q => q[key]).filter(Number.isFinite);
  const min = key => numbers(key).length ? Math.min(...numbers(key)) : null;
  const max = key => numbers(key).length ? Math.max(...numbers(key)) : null;
  return {
    dailyLimit: max('dailyLimit'),
    dailyRemaining: min('dailyRemaining'),
    minuteLimit: max('minuteLimit'),
    minuteRemaining: min('minuteRemaining')
  };
}

exports.handler = async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'GET') {
    return json(405, { ok: false, error: 'Método não permitido.' });
  }

  const query = event.queryStringParameters || {};
  const action = String(query.action || 'live').toLowerCase();

  try {
    if (action === 'health') {
      return json(200, {
        ok: true,
        service: 'GRIEL Live Backend',
        version: '10.0',
        configured: Boolean(process.env.API_FOOTBALL_KEY),
        now: new Date().toISOString()
      }, 30);
    }

    // Heartbeat principal: um único request retorna todos os jogos live + eventos atuais.
    if (action === 'live') {
      const { payload, quota } = await apiFetch('/fixtures?live=all');
      const bypass = Boolean(query._fresh);
      return json(200, {
        ok: true,
        source: 'api-football',
        updatedAt: new Date().toISOString(),
        quota,
        results: payload.results || 0,
        response: Array.isArray(payload.response) ? payload.response : []
      }, bypass ? 0 : 12);
    }

    // Um único request por partida retorna fixture, eventos, estatísticas, escalações e jogadores.
    if (action === 'matchcenter') {
      const id = fixtureId(query);
      if (!id) return json(400, { ok: false, error: 'fixture inválido.' });

      const { payload, quota } = await apiFetch(`/fixtures?id=${id}`);
      const bypass = Boolean(query._fresh);
      return json(200, {
        ok: true,
        source: 'api-football',
        fixture: id,
        updatedAt: new Date().toISOString(),
        quota,
        results: payload.results || 0,
        response: Array.isArray(payload.response) ? payload.response : []
      }, bypass ? 0 : 12);
    }

    // Odds ao vivo. Só é consultado quando o usuário abre a aba de odds/análise.
    if (action === 'odds') {
      const id = fixtureId(query);
      if (!id) return json(400, { ok: false, error: 'fixture inválido.' });

      const { payload, quota } = await apiFetch(`/odds/live?fixture=${id}`);
      const bypass = Boolean(query._fresh);
      return json(200, {
        ok: true,
        source: 'api-football',
        fixture: id,
        updatedAt: new Date().toISOString(),
        quota,
        results: payload.results || 0,
        response: Array.isArray(payload.response) ? payload.response : []
      }, bypass ? 0 : 20);
    }

    // Contexto pré-jogo sob demanda: prediction + últimos confrontos diretos.
    if (action === 'context') {
      const id = fixtureId(query);
      const home = teamId(query.home);
      const away = teamId(query.away);
      if (!id) return json(400, { ok: false, error: 'fixture inválido.' });

      const tasks = [apiFetch(`/predictions?fixture=${id}`)];
      if (home && away) tasks.push(apiFetch(`/fixtures/headtohead?h2h=${home}-${away}&last=5`));

      const settled = await Promise.allSettled(tasks);
      const prediction = settled[0]?.status === 'fulfilled' ? settled[0].value : null;
      const h2h = settled[1]?.status === 'fulfilled' ? settled[1].value : null;
      if (!prediction && !h2h) {
        const firstError = settled.find(item => item.status === 'rejected')?.reason;
        throw firstError || new UpstreamError('Contexto indisponível.', 502);
      }

      return json(200, {
        ok: true,
        source: 'api-football',
        fixture: id,
        updatedAt: new Date().toISOString(),
        quota: mergeQuota(prediction?.quota, h2h?.quota),
        prediction: prediction && Array.isArray(prediction.payload.response) ? prediction.payload.response : [],
        h2h: h2h && Array.isArray(h2h.payload.response) ? h2h.payload.response : []
      }, 1800);
    }

    return json(400, { ok: false, error: 'Ação inválida.' });
  } catch (error) {
    const status = error instanceof UpstreamError ? error.status : 502;
    return json(status, {
      ok: false,
      error: status === 429 ? 'Limite temporário de requisições atingido.' : 'Falha ao consultar o provedor esportivo.',
      detail: error.message,
      quota: error.quota || null,
      retryAfterSeconds: status === 429 ? 15 : 5
    });
  }
};
