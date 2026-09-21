const API_BASE = 'https://v3.football.api-sports.io';

const json = (statusCode, body, cacheSeconds = 0) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',

    ...(cacheSeconds > 0
      ? {
          'Netlify-CDN-Cache-Control':
            `public, durable, max-age=${cacheSeconds}, stale-while-revalidate=${Math.min(cacheSeconds, 120)}`,
          'Cache-Control':
            `public, max-age=${Math.min(cacheSeconds, 60)}`
        }
      : {
          'Cache-Control': 'no-store'
        })
  },

  body: JSON.stringify(body)
});

async function apiFetch(path) {
  const key = process.env.API_FOOTBALL_KEY;

  if (!key) {
    throw new Error(
      'API_FOOTBALL_KEY não configurada na Netlify.'
    );
  }

  const response = await fetch(
    `${API_BASE}${path}`,
    {
      method: 'GET',

      headers: {
        'x-apisports-key': key,
        'accept': 'application/json'
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `API-Football respondeu HTTP ${response.status}.`
    );
  }

  const errors = data && data.errors;

  const hasErrors =
    Array.isArray(errors)
      ? errors.length > 0
      : errors && Object.keys(errors).length > 0;

  if (hasErrors) {
    throw new Error(
      typeof errors === 'string'
        ? errors
        : JSON.stringify(errors)
    );
  }

  return data;
}

function fixtureIdFrom(query) {
  const raw = query && (query.fixture || query.id);
  const id = Number(raw);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

exports.handler = async function handler(event) {

  if (event.httpMethod === 'OPTIONS') {
    return json(204, {});
  }

  if (event.httpMethod !== 'GET') {
    return json(
      405,
      {
        ok: false,
        error: 'Método não permitido.'
      }
    );
  }

  const params =
    event.queryStringParameters || {};

  const action =
    String(params.action || 'live').toLowerCase();

  try {

    /*
     * TESTE DO BACKEND
     */
    if (action === 'health') {

      return json(
        200,
        {
          ok: true,
          service: 'GRIEL Live Backend',
          configured:
            Boolean(process.env.API_FOOTBALL_KEY),
          now: new Date().toISOString()
        },
        30
      );
    }

    /*
     * JOGOS AO VIVO
     */
    if (action === 'live') {

      const data =
        await apiFetch('/fixtures?live=all');

      return json(
        200,
        {
          ok: true,
          source: 'api-football',
          updatedAt:
            new Date().toISOString(),
          results:
            data.results || 0,
          response:
            Array.isArray(data.response)
              ? data.response
              : []
        },
        1800
      );
    }

    /*
     * ODDS AO VIVO
     */
    if (action === 'odds') {

      const fixture =
        fixtureIdFrom(params);

      if (!fixture) {
        return json(
          400,
          {
            ok: false,
            error: 'fixture inválido.'
          }
        );
      }

      const data =
        await apiFetch(
          `/odds/live?fixture=${fixture}`
        );

      return json(
        200,
        {
          ok: true,
          source: 'api-football',
          fixture,
          updatedAt:
            new Date().toISOString(),
          results:
            data.results || 0,
          response:
            Array.isArray(data.response)
              ? data.response
              : []
        },
        600
      );
    }

    /*
     * ESTATÍSTICAS DO JOGO
     */
    if (action === 'stats') {

      const fixture =
        fixtureIdFrom(params);

      if (!fixture) {
        return json(
          400,
          {
            ok: false,
            error: 'fixture inválido.'
          }
        );
      }

      const data =
        await apiFetch(
          `/fixtures/statistics?fixture=${fixture}`
        );

      return json(
        200,
        {
          ok: true,
          source: 'api-football',
          fixture,
          updatedAt:
            new Date().toISOString(),
          results:
            data.results || 0,
          response:
            Array.isArray(data.response)
              ? data.response
              : []
        },
        600
      );
    }

    /*
     * PREDIÇÕES DO PROVEDOR
     */
    if (action === 'prediction') {

      const fixture =
        fixtureIdFrom(params);

      if (!fixture) {
        return json(
          400,
          {
            ok: false,
            error: 'fixture inválido.'
          }
        );
      }

      const data =
        await apiFetch(
          `/predictions?fixture=${fixture}`
        );

      return json(
        200,
        {
          ok: true,
          source: 'api-football',
          fixture,
          updatedAt:
            new Date().toISOString(),
          results:
            data.results || 0,
          response:
            Array.isArray(data.response)
              ? data.response
              : []
        },
        1800
      );
    }

    return json(
      400,
      {
        ok: false,
        error: 'Ação inválida.'
      }
    );

  } catch (error) {

    console.error(
      '[GRIEL LIVE]',
      error
    );

    return json(
      502,
      {
        ok: false,
        error:
          'Falha ao consultar o provedor esportivo.',
        detail:
          error.message
      }
    );
  }
};
