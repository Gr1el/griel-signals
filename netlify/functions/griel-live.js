const API_BASE = 'https://v3.football.api-sports.io';

const json = (statusCode, body, cacheSeconds = 0) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...(cacheSeconds > 0 ? {
      'Netlify-CDN-Cache-Control': `public, durable, max-age=${cacheSeconds}, stale-while-revalidate=${cacheSeconds <= 15 ? 5 : cacheSeconds <= 60 ? 10 : 120}`,
      'Cache-Control': `public, max-age=${Math.min(cacheSeconds, 60)}`
    } : {
      'Cache-Control': 'no-store'
    })
  },
  body: JSON.stringify(body)
});

async function apiFetch(path) {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) throw new Error('API_FOOTBALL_KEY não configurada na Netlify.');

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      'x-apisports-key': key,
      'accept': 'application/json'
    }
  });

  const data = await response.json();
  const quota = {
    dailyLimit: response.headers.get('x-ratelimit-requests-limit'),
    dailyRemaining: response.headers.get('x-ratelimit-requests-remaining'),
    minuteLimit: response.headers.get('x-ratelimit-limit'),
    minuteRemaining: response.headers.get('x-ratelimit-remaining')
  };
  if (!response.ok) {
    throw new Error(`API-Football respondeu HTTP ${response.status}.`);
  }

  const errors = data && data.errors;
  const hasErrors = Array.isArray(errors) ? errors.length > 0 : errors && Object.keys(errors).length > 0;
  if (hasErrors) {
    throw new Error(typeof errors === 'string' ? errors : JSON.stringify(errors));
  }

  return { data, quota };
}

function fixtureIdFrom(query) {
  const raw = query && (query.fixture || query.id);
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

exports.handler = async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'GET') return json(405, { ok: false, error: 'Método não permitido.' });

  const action = String((event.queryStringParameters || {}).action || 'live').toLowerCase();

  try {
    if (action === 'health') {
      return json(200, {
        ok: true,
        service: 'GRIEL Live Backend',
        configured: Boolean(process.env.API_FOOTBALL_KEY),
        now: new Date().toISOString()
      }, 30);
    }

    if (action === 'live') {
      const { data, quota } = await apiFetch('/fixtures?live=all');
      return json(200, {
        ok: true,
        source: 'api-football',
        updatedAt: new Date().toISOString(),
        quota,
        results: data.results || 0,
        response: Array.isArray(data.response) ? data.response : []
      }, 15);
    }

    if (action === 'odds') {
      const fixture = fixtureIdFrom(event.queryStringParameters);
      if (!fixture) return json(400, { ok: false, error: 'fixture inválido.' });
      const { data, quota } = await apiFetch(`/odds/live?fixture=${fixture}`);
      return json(200, {
        ok: true,
        source: 'api-football',
        fixture,
        updatedAt: new Date().toISOString(),
        quota,
        results: data.results || 0,
        response: Array.isArray(data.response) ? data.response : []
      }, 15);
    }

    if (action === 'stats') {
      const fixture = fixtureIdFrom(event.queryStringParameters);
      if (!fixture) return json(400, { ok: false, error: 'fixture inválido.' });
      const { data, quota } = await apiFetch(`/fixtures/statistics?fixture=${fixture}`);
      return json(200, {
        ok: true,
        source: 'api-football',
        fixture,
        updatedAt: new Date().toISOString(),
        quota,
        results: data.results || 0,
        response: Array.isArray(data.response) ? data.response : []
      }, 60);
    }

    if (action === 'matchcenter') {
      const fixture = fixtureIdFrom(event.queryStringParameters);
      if (!fixture) return json(400, { ok: false, error: 'fixture inválido.' });
      const { data, quota } = await apiFetch(`/fixtures?id=${fixture}`);
      return json(200, {
        ok: true,
        source: 'api-football',
        fixture,
        updatedAt: new Date().toISOString(),
        quota,
        results: data.results || 0,
        response: Array.isArray(data.response) ? data.response : []
      }, 15);
    }

    if (action === 'prediction') {
      const fixture = fixtureIdFrom(event.queryStringParameters);
      if (!fixture) return json(400, { ok: false, error: 'fixture inválido.' });
      const { data, quota } = await apiFetch(`/predictions?fixture=${fixture}`);
      return json(200, {
        ok: true,
        source: 'api-football',
        fixture,
        updatedAt: new Date().toISOString(),
        quota,
        results: data.results || 0,
        response: Array.isArray(data.response) ? data.response : []
      }, 1800);
    }

    return json(400, { ok: false, error: 'Ação inválida.' });
  } catch (error) {
    return json(502, {
      ok: false,
      error: 'Falha ao consultar o provedor esportivo.',
      detail: error.message
    });
  }
};
