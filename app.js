(() => {
  'use strict';

  const CONFIG = window.GRIEL_CONFIG || {};
  const ENDPOINT = CONFIG.endpoint || '/api/griel';
  const LIVE_POLL_MS = CONFIG.livePollMs || 15000;
  const MATCH_POLL_MS = CONFIG.matchPollMs || 15000;

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const num = (value, fallback = 0) => {
    const n = Number(String(value ?? '').replace('%','').replace(',','.'));
    return Number.isFinite(n) ? n : fallback;
  };
  const norm = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();

  const MARKET_CATALOG = [
    { title:'Resultado do jogo', text:'Vencedor no tempo normal. O GRIEL exige liderança + vantagem estatística + odd live compatível.', items:['Casa vence','Visitante vence','Empate','Dupla chance'] },
    { title:'Gols', text:'Total de gols da partida. O motor cruza linha disponível, minuto, finalizações e chutes no alvo.', items:['Over 0.5','Over 1.5','Over 2.5','Under'] },
    { title:'Ambas marcam', text:'Os dois times precisam marcar. O motor observa produção ofensiva do time que ainda não marcou.', items:['Sim','Não'] },
    { title:'Escanteios', text:'Total de escanteios. A leitura usa linha real + quantidade atual + ritmo projetado.', items:['Over de escanteios','Linhas ao vivo'] },
    { title:'Cartões', text:'Total disciplinar. A leitura cruza cartões atuais, faltas e linha live.', items:['Over de cartões','Linhas ao vivo'] },
    { title:'Contexto', text:'Prediction e últimos confrontos podem ser carregados sob demanda para complementar a leitura.', items:['Prediction','H2H últimos 5'] }
  ];

  const ACADEMY = [
    { title:'Odd', text:'É a cotação. R$ 20 em odd 1.80 retorna R$ 36 bruto se a aposta vencer.' },
    { title:'Over 2.5 gols', text:'A partida precisa terminar com pelo menos 3 gols.' },
    { title:'Ambas marcam — SIM', text:'Cada time precisa marcar pelo menos um gol.' },
    { title:'Dupla chance', text:'Duas possibilidades de resultado ficam cobertas, por exemplo Casa ou Empate.' },
    { title:'Over 8.5 escanteios', text:'A partida precisa terminar com 9 ou mais escanteios.' },
    { title:'GRIEL Score', text:'É uma pontuação interna de força do sinal. Não representa probabilidade garantida de acerto.' }
  ];

  const state = {
    mode: 'connecting',
    matches: [],
    signals: [],
    liveUpdatedAt: null,
    liveError: '',
    quota: null,
    liveTimer: null,
    runtimeTimer: null,
    settings: loadSettings(),
    history: loadHistory(),
    center: {
      open: false,
      fixtureId: null,
      tab: 'overview',
      detail: null,
      detailUpdatedAt: null,
      odds: [],
      oddsUpdatedAt: null,
      oddsFilter: 'all',
      context: null,
      detailTimer: null,
      oddsTimer: null,
      loading: false,
      oddsLoading: false,
      contextLoading: false,
      analysisMessage: ''
    }
  };

  function loadSettings() {
    try {
      return { minScore:72, minOdd:1.35, maxOdd:3.0, ...JSON.parse(localStorage.getItem('grielSettingsV9') || '{}') };
    } catch {
      return { minScore:72, minOdd:1.35, maxOdd:3.0 };
    }
  }

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem('grielHistoryV9') || '[]'); }
    catch { return []; }
  }

  function saveHistory() {
    localStorage.setItem('grielHistoryV9', JSON.stringify(state.history.slice(0, 200)));
  }

  function ageSeconds(iso) {
    if (!iso) return null;
    const value = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    return Number.isFinite(value) ? Math.max(0, value) : null;
  }

  function ageLabel(iso) {
    const age = ageSeconds(iso);
    if (age === null) return 'sincronizando';
    if (age < 5) return 'agora';
    if (age < 60) return `há ${age}s`;
    return `há ${Math.floor(age/60)}min`;
  }

  function translateStatus(value) {
    const key = String(value || '');
    const map = {
      'First Half':'1º tempo','Second Half':'2º tempo','Halftime':'Intervalo','Extra Time':'Prorrogação',
      'Break Time':'Pausa','Penalty In Progress':'Pênaltis','Match Finished':'Encerrado',
      '1H':'1º tempo','2H':'2º tempo','HT':'Intervalo','ET':'Prorrogação','BT':'Pausa','P':'Pênaltis'
    };
    return map[key] || key || 'Ao vivo';
  }

  function minuteLabel(match) {
    const elapsed = num(match?.minute, 0);
    const extra = num(match?.extra, 0);
    if (!elapsed) return match?.statusShort === 'HT' ? 'INT' : 'LIVE';
    return extra > 0 ? `${elapsed}'+${extra}` : `${elapsed}'`;
  }

  function updateQuota(quota) {
    if (!quota) return;
    state.quota = { ...state.quota, ...quota };
  }

  function quotaLabel() {
    if (!state.quota) return 'API —';
    const daily = Number.isFinite(state.quota.dailyRemaining) ? state.quota.dailyRemaining : '—';
    const minute = Number.isFinite(state.quota.minuteRemaining) ? state.quota.minuteRemaining : '—';
    return `API ${daily}d · ${minute}m`;
  }

  function activeSyncAt() {
    return state.center.open && state.center.detailUpdatedAt ? state.center.detailUpdatedAt : state.liveUpdatedAt;
  }

  function isFresh() {
    const age = ageSeconds(activeSyncAt());
    return age !== null && age <= 45;
  }

  function updateRuntimeLabels() {
    const pill = $('#syncPill');
    const quota = $('#quotaPill');
    if (!pill || !quota) return;

    pill.classList.remove('live','error');
    if (state.mode === 'live' && isFresh()) {
      pill.classList.add('live');
      pill.querySelector('b').textContent = 'LIVE';
    } else if (state.mode === 'error') {
      pill.classList.add('error');
      pill.querySelector('b').textContent = 'RECONECTANDO';
    } else {
      pill.querySelector('b').textContent = 'SYNC';
    }
    quota.textContent = quotaLabel();

    const liveAge = ageLabel(state.liveUpdatedAt);
    const activeAge = ageLabel(activeSyncAt());
    $$('[data-live-age]').forEach(el => el.textContent = liveAge);
    if ($('#dashSync')) $('#dashSync').textContent = state.liveUpdatedAt ? liveAge.replace('há ','') : '—';
    if ($('#feedMeta')) $('#feedMeta').textContent = state.liveUpdatedAt ? `Sincronizado ${liveAge}` : 'Sincronizando...';

    if ($('#sideEngine')) $('#sideEngine').textContent = state.mode === 'live' ? 'GRIEL Engine Live' : 'GRIEL Engine';
    if ($('#sideEngineSub')) $('#sideEngineSub').textContent = state.mode === 'live' ? `Sincronizado ${activeAge}` : 'Reconectando...';
  }

  async function api(action, params = {}) {
    const url = new URL(ENDPOINT, window.location.origin);
    url.searchParams.set('action', action);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), { cache:'no-store', headers:{'Accept':'application/json'} });
    let data;
    try { data = await response.json(); }
    catch { throw new Error(`Resposta inválida do backend (HTTP ${response.status}).`); }

    updateQuota(data.quota);
    if (!response.ok || !data.ok) {
      const error = new Error(data.detail || data.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.retryAfterSeconds = data.retryAfterSeconds || 5;
      throw error;
    }
    return data;
  }

  function fixtureToMatch(item) {
    const fixture = item?.fixture || {};
    const status = fixture.status || {};
    const teams = item?.teams || {};
    const league = item?.league || {};
    const goals = item?.goals || {};
    return {
      id: fixture.id,
      date: fixture.date || '',
      timestamp: fixture.timestamp || null,
      referee: fixture.referee || '',
      venue: fixture.venue?.name || '',
      city: fixture.venue?.city || '',
      minute: num(status.elapsed, 0),
      extra: num(status.extra, 0),
      status: translateStatus(status.long || status.short),
      statusShort: status.short || '',
      home: teams.home?.name || 'Mandante',
      away: teams.away?.name || 'Visitante',
      homeId: teams.home?.id || null,
      awayId: teams.away?.id || null,
      homeLogo: teams.home?.logo || '',
      awayLogo: teams.away?.logo || '',
      homeWinner: teams.home?.winner,
      awayWinner: teams.away?.winner,
      homeGoals: num(goals.home, 0),
      awayGoals: num(goals.away, 0),
      leagueId: league.id || null,
      season: league.season || null,
      leagueName: league.name || 'Competição',
      country: league.country || '',
      leagueLogo: league.logo || '',
      flag: league.flag || '',
      round: league.round || '',
      events: Array.isArray(item?.events) ? item.events : [],
      raw: item
    };
  }

  function mergeDetailIntoMatch(detail) {
    if (!detail?.fixture?.id) return;
    const next = fixtureToMatch(detail);
    const index = state.matches.findIndex(m => m.id === next.id);
    if (index >= 0) state.matches[index] = { ...state.matches[index], ...next };
    else state.matches.push(next);
  }

  function crest(url, name) {
    const initial = esc(String(name || '?').trim().charAt(0).toUpperCase());
    return `<div class="crest"><span>${initial}</span>${url ? `<img data-fallback-img src="${esc(url)}" alt="${esc(name)}">` : ''}</div>`;
  }

  function wireImageFallbacks(root = document) {
    $$('img[data-fallback-img]', root).forEach(img => {
      if (img.dataset.wired) return;
      img.dataset.wired = '1';
      img.addEventListener('error', () => img.remove(), { once:true });
    });
  }

  function eventIcon(event) {
    const type = norm(event?.type);
    const detail = norm(event?.detail);
    if (type.includes('goal')) return '⚽';
    if (type.includes('card')) return detail.includes('red') ? '🟥' : '🟨';
    if (type.includes('subst')) return '↔';
    if (type.includes('var')) return '▣';
    return '●';
  }

  function eventTitle(event) {
    const detail = String(event?.detail || '').trim();
    const type = String(event?.type || '').trim();
    if (detail) return detail;
    return type || 'Evento';
  }

  function eventMinute(event) {
    const elapsed = num(event?.time?.elapsed, 0);
    const extra = num(event?.time?.extra, 0);
    return extra > 0 ? `${elapsed}'+${extra}` : `${elapsed}'`;
  }

  function lastEvent(match) {
    return Array.isArray(match.events) && match.events.length ? match.events[match.events.length - 1] : null;
  }

  function setPage(page) {
    $$('.page').forEach(el => el.classList.toggle('active', el.id === page));
    $$('.nav button').forEach(btn => btn.classList.toggle('active', btn.dataset.page === page));
    const titles = {
      dashboard:['Painel','Central de acompanhamento e análise em tempo real.'],
      live:['Jogos ao vivo','Partidas reais recebidas pelo backend seguro da GRIEL.'],
      signals:['Sinais','Entradas validadas com estatísticas e odds reais.'],
      markets:['Mercados','Tipos de mercado monitorados pelo motor.'],
      academy:['Academy','Explicações simples para o cliente entender a entrada.'],
      history:['Histórico','Registro local dos sinais gerados neste navegador.'],
      settings:['Configurações','Filtros do motor e status da infraestrutura.']
    };
    $('#pageTitle').textContent = titles[page]?.[0] || 'GRIEL';
    $('#pageSubtitle').textContent = titles[page]?.[1] || '';
    if (page === 'live') renderLive();
    if (page === 'signals') renderSignals();
    if (page === 'history') renderHistory();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  async function loadLive({manual = false} = {}) {
    if (state.center.open && !manual) return;
    try {
      const data = await api('live');
      state.matches = (data.response || []).map(fixtureToMatch).filter(m => m.id);
      state.liveUpdatedAt = data.updatedAt || new Date().toISOString();
      state.liveError = '';
      state.mode = 'live';
      renderDashboard();
      renderLive();
      updateRuntimeLabels();
      if (manual) toast(`${state.matches.length} jogo(s) sincronizado(s).`);
    } catch (error) {
      state.liveError = error.message;
      state.mode = state.matches.length ? 'error' : 'error';
      updateRuntimeLabels();
      if (!state.matches.length) renderLive();
      if (manual) toast(`Não foi possível atualizar agora: ${error.message}`);
    }
  }

  function startLivePolling() {
    clearInterval(state.liveTimer);
    if (state.center.open) return;
    state.liveTimer = setInterval(() => {
      if (document.visibilityState === 'visible' && !state.center.open) loadLive();
    }, LIVE_POLL_MS);
  }

  function stopLivePolling() {
    clearInterval(state.liveTimer);
    state.liveTimer = null;
  }

  function renderDashboard() {
    $('#dashLiveCount').textContent = state.matches.length;
    $('#dashSignalCount').textContent = state.signals.length;
    $('#dashQuota').textContent = Number.isFinite(state.quota?.dailyRemaining) ? state.quota.dailyRemaining : '—';
    $('#dashLiveSub').textContent = state.matches.length ? `${new Set(state.matches.map(m=>m.country).filter(Boolean)).size} país(es)` : 'Nenhuma partida agora';

    const sorted = [...state.matches].sort((a,b) => b.minute - a.minute).slice(0,5);
    $('#dashboardLiveList').innerHTML = sorted.length ? sorted.map(match => `
      <button class="dash-match" data-open-match="${match.id}">
        <div><strong>${esc(match.home)} × ${esc(match.away)}</strong><small>${esc([match.country,match.leagueName].filter(Boolean).join(' • '))}</small></div>
        <div class="dash-score"><b>${match.homeGoals} - ${match.awayGoals}</b><span>${minuteLabel(match)}</span></div>
      </button>`).join('') : `<div class="empty">Nenhuma partida ao vivo retornada pelo provedor neste momento.</div>`;

    $('#featuredSignal').innerHTML = state.signals.length
      ? signalCard(state.signals[0], true)
      : `<div class="analysis-empty"><b>Nenhum sinal gerado ainda.</b><p>Abra uma partida ao vivo, entre na aba <strong>GRIEL</strong> e clique em <strong>Analisar agora</strong>.</p></div>`;
    wireImageFallbacks($('#dashboard'));
  }

  function renderLive() {
    const grid = $('#liveGrid');
    if (!grid) return;
    const search = norm($('#matchSearch')?.value || '');
    const league = $('#leagueFilter')?.value || '';

    const leagues = [...new Set(state.matches.map(m => [m.country,m.leagueName].filter(Boolean).join(' • ')))].sort();
    const select = $('#leagueFilter');
    if (select) {
      const current = select.value;
      select.innerHTML = `<option value="">Todas as competições</option>` + leagues.map(l => `<option value="${esc(l)}">${esc(l)}</option>`).join('');
      if (leagues.includes(current)) select.value = current;
    }

    const filtered = state.matches.filter(match => {
      const comp = [match.country,match.leagueName].filter(Boolean).join(' • ');
      const hay = norm(`${match.home} ${match.away} ${comp}`);
      return (!search || hay.includes(search)) && (!league || comp === league);
    });

    if (!filtered.length) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1">${state.matches.length ? 'Nenhum jogo corresponde ao filtro.' : (state.liveError ? `Reconectando ao feed: ${esc(state.liveError)}` : 'Nenhum jogo ao vivo neste momento.')}</div>`;
      return;
    }

    grid.innerHTML = filtered.map(liveCard).join('');
    wireImageFallbacks(grid);
  }

  function liveCard(match) {
    const recent = lastEvent(match);
    return `<article class="live-card">
      <div class="live-card-head">
        <div class="league-line">${match.flag ? `<img data-fallback-img src="${esc(match.flag)}" alt="">` : ''}<span>${esc([match.country,match.leagueName].filter(Boolean).join(' • '))}</span>${match.round ? `<small>• ${esc(match.round)}</small>` : ''}</div>
        <span class="live-badge">AO VIVO</span>
      </div>
      <div class="scoreboard">
        <div class="team-box">${crest(match.homeLogo,match.home)}<strong>${esc(match.home)}</strong></div>
        <div class="score-center"><b>${match.homeGoals} - ${match.awayGoals}</b><span>${minuteLabel(match)}</span><small>${esc(match.status)}</small></div>
        <div class="team-box away">${crest(match.awayLogo,match.away)}<strong>${esc(match.away)}</strong></div>
      </div>
      ${recent ? `<div class="event-strip"><span>${eventIcon(recent)}</span><div><b>${esc(eventTitle(recent))} • ${eventMinute(recent)}</b><small>${esc([recent.team?.name,recent.player?.name].filter(Boolean).join(' • '))}</small></div></div>` : `<div class="event-strip"><span>●</span><div><b>Aguardando próximo evento</b><small>Gols, cartões, substituições e VAR aparecem quando o provedor envia.</small></div></div>`}
      <div class="live-actions">
        <button class="btn primary" data-open-match="${match.id}">Central da partida</button>
        <button class="btn secondary" data-quick-analysis="${match.id}">Analisar sinal</button>
      </div>
      <div class="sync-note"><span>Feed principal <b data-live-age>${ageLabel(state.liveUpdatedAt)}</b></span><span>${match.venue ? esc(match.venue) : ''}</span></div>
    </article>`;
  }

  function signalCard(signal, compact = false) {
    return `<article class="signal-card">
      <div class="signal-top"><span class="signal-label">ϟ SINAL GRIEL VALIDADO</span><span class="signal-rating">${Math.round(signal.rating)}/100</span></div>
      <div class="signal-game"><h3>${esc(signal.home)} × ${esc(signal.away)}</h3><small>${esc(signal.league)} • ${minuteLabel(signal.match)} • ${esc(signal.score)}</small></div>
      <div class="bet-box"><span>O QUE APOSTAR</span><b>${esc(signal.bet)}</b><small>${esc(signal.condition)}</small></div>
      <div class="signal-meta">
        <div><span>ODD</span><b>${formatOdd(signal.odd)}</b></div>
        <div><span>BOOKMAKER</span><b>${esc(signal.bookmaker || 'Disponível')}</b></div>
        <div><span>MERCADO</span><b>${esc(signal.marketType)}</b></div>
      </div>
      ${compact ? '' : `<div class="why-box"><b>Por que apareceu</b>${signal.why.map(x=>`<p>✓ ${esc(x)}</p>`).join('')}</div><div class="risk-box"><b>Risco</b><p>${esc(signal.risk)}</p></div>`}
    </article>`;
  }

  function renderSignals() {
    const grid = $('#signalGrid');
    if (!grid) return;
    const search = norm($('#signalSearch')?.value || '');
    const market = $('#signalMarketFilter')?.value || '';
    const minScore = num($('#signalScoreFilter')?.value, 0);

    const marketTypes = [...new Set(state.signals.map(s => s.marketType))].sort();
    const select = $('#signalMarketFilter');
    if (select) {
      const current = select.value;
      select.innerHTML = `<option value="">Todos os mercados</option>` + marketTypes.map(m=>`<option value="${esc(m)}">${esc(m)}</option>`).join('');
      if (marketTypes.includes(current)) select.value = current;
    }

    const filtered = state.signals.filter(signal => {
      const hay = norm(`${signal.home} ${signal.away} ${signal.bet} ${signal.marketType}`);
      return (!search || hay.includes(search)) && (!market || signal.marketType === market) && signal.rating >= minScore;
    });

    grid.innerHTML = filtered.length ? filtered.map(s => signalCard(s)).join('') : `<div class="empty" style="grid-column:1/-1">Nenhum sinal validado com os filtros atuais. O GRIEL não cria entrada sem estatísticas e odd live compatíveis.</div>`;
  }

  function renderMarkets() {
    $('#marketCatalog').innerHTML = MARKET_CATALOG.map(item => `<article class="catalog-card"><span class="eyebrow">MERCADO</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><ul>${item.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>`).join('');
  }

  function renderAcademy() {
    $('#academyGrid').innerHTML = ACADEMY.map(item => `<article class="academy-card"><span class="eyebrow">GUIA RÁPIDO</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('');
    calculateReturn();
  }

  function calculateReturn() {
    const stake = num($('#stakeInput')?.value,0);
    const odd = num($('#oddInput')?.value,0);
    $('#returnOutput').textContent = (stake * odd).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  }

  function renderHistory() {
    const tbody = $('#historyRows');
    if (!tbody) return;
    tbody.innerHTML = state.history.length ? state.history.map(item => `<tr><td>${esc(item.time)}</td><td>${esc(item.game)}</td><td>${esc(item.bet)}</td><td>${formatOdd(item.odd)}</td><td>${Math.round(item.rating)}/100</td><td class="status-pending">${esc(item.status || 'Pendente')}</td></tr>`).join('') : `<tr><td colspan="6" style="text-align:center;color:var(--muted)">Nenhum sinal registrado ainda.</td></tr>`;
  }

  function recordSignals(signals) {
    const now = new Date();
    signals.forEach(signal => {
      const key = `${signal.fixtureId}|${signal.bet}|${signal.odd}`;
      if (state.history.some(item => item.key === key)) return;
      state.history.unshift({
        key,
        fixtureId: signal.fixtureId,
        time: now.toLocaleString('pt-BR'),
        game: `${signal.home} × ${signal.away}`,
        bet: signal.bet,
        odd: signal.odd,
        rating: signal.rating,
        status: 'Pendente'
      });
    });
    saveHistory();
    renderHistory();
  }

  function statValue(stats, type) {
    const found = (stats || []).find(item => norm(item.type) === norm(type));
    return found?.value ?? null;
  }

  function statSnapshot(detail) {
    const statistics = Array.isArray(detail?.statistics) ? detail.statistics : [];
    if (statistics.length < 2) return null;
    const side = block => ({
      name:block.team?.name || '',
      shots:num(statValue(block.statistics,'Total Shots'),0),
      onTarget:num(statValue(block.statistics,'Shots on Goal'),0),
      corners:num(statValue(block.statistics,'Corner Kicks'),0),
      fouls:num(statValue(block.statistics,'Fouls'),0),
      yellow:num(statValue(block.statistics,'Yellow Cards'),0),
      red:num(statValue(block.statistics,'Red Cards'),0),
      possession:num(statValue(block.statistics,'Ball Possession'),0),
      saves:num(statValue(block.statistics,'Goalkeeper Saves'),0),
      xg:num(statValue(block.statistics,'expected_goals'),0)
    });
    return { home:side(statistics[0]), away:side(statistics[1]) };
  }

  function flattenOdds(response) {
    const rows = [];
    (Array.isArray(response) ? response : []).forEach(item => {
      const bookmakers = Array.isArray(item.bookmakers) ? item.bookmakers : [];
      bookmakers.forEach(bookmaker => {
        (bookmaker.bets || []).forEach(bet => {
          (bet.values || []).forEach(value => {
            const odd = num(value.odd ?? value.price, NaN);
            if (!Number.isFinite(odd) || odd <= 1) return;
            rows.push({
              bookmaker:bookmaker.name || `Bookmaker ${bookmaker.id || ''}`,
              market:bet.name || bet.label || `Mercado ${bet.id || ''}`,
              choice:value.value ?? value.name ?? value.label ?? '',
              odd,
              handicap:value.handicap ?? null,
              main:value.main ?? false,
              suspended:Boolean(value.suspended || value.blocked || item.blocked || item.stopped),
              betId:bet.id ?? null
            });
          });
        });
      });
    });
    return rows;
  }

  function formatOdd(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n.toFixed(2) : '—';
  }

  function lineFromOdd(row) {
    const h = Number(row.handicap);
    if (Number.isFinite(h)) return Math.abs(h);
    const text = `${row.choice} ${row.market}`.replace(',','.');
    const match = text.match(/([0-9]+(?:\.[0-9]+)?)/);
    return match ? Number(match[1]) : null;
  }

  function usableOdd(row) {
    return !row.suspended && row.odd >= state.settings.minOdd && row.odd <= state.settings.maxOdd;
  }

  function bestOdd(rows, predicate) {
    return rows.filter(row => usableOdd(row) && predicate(row)).sort((a,b) => Number(Boolean(b.main)) - Number(Boolean(a.main)) || b.odd - a.odd)[0] || null;
  }

  const isWinnerMarket = row => /match winner|winner|1x2|resultado/.test(norm(row.market));
  const isDoubleChance = row => /double chance|dupla chance/.test(norm(row.market));
  const isGoalsMarket = row => /goals over|over\/under|total goals|goals - over|gols/.test(norm(row.market));
  const isBttsMarket = row => /both teams.*score|btts|ambas.*marcam/.test(norm(row.market));
  const isCornersMarket = row => /corner/.test(norm(row.market));
  const isCardsMarket = row => /card/.test(norm(row.market));
  const isOver = row => /\bover\b|mais de/.test(norm(row.choice)) || /\bover\b/.test(norm(row.market));
  const isYes = row => /^(yes|sim)$/.test(norm(row.choice)) || / yes$/.test(norm(row.choice));

  function outcomeMatches(row, match, side) {
    const value = norm(row.choice);
    const name = norm(side === 'home' ? match.home : match.away);
    if (value === name || value.includes(name)) return true;
    if (side === 'home' && /^(home|1)$/.test(value)) return true;
    if (side === 'away' && /^(away|2)$/.test(value)) return true;
    return false;
  }

  function doubleChanceMatches(row, match, side) {
    const value = norm(row.choice);
    const name = norm(side === 'home' ? match.home : match.away);
    if (value.includes(name) && value.includes('draw')) return true;
    if (side === 'home' && /1x|home.*draw|draw.*home/.test(value)) return true;
    if (side === 'away' && /x2|away.*draw|draw.*away/.test(value)) return true;
    return false;
  }

  function makeSignal(match, oddRow, data) {
    return {
      id:`${match.id}-${data.marketType}-${data.bet}`,
      fixtureId:match.id,
      home:match.home,
      away:match.away,
      league:[match.country,match.leagueName].filter(Boolean).join(' • '),
      score:`${match.homeGoals}-${match.awayGoals}`,
      match:{minute:match.minute,extra:match.extra},
      marketType:data.marketType,
      bet:data.bet,
      odd:oddRow.odd,
      bookmaker:oddRow.bookmaker,
      rating:clamp(Math.round(data.rating),0,95),
      condition:data.condition,
      why:data.why,
      risk:data.risk
    };
  }

  function generateSignals(match, detail, odds) {
    const snap = statSnapshot(detail);
    if (!snap || !odds.length) return [];

    const result = [];
    const minute = num(detail?.fixture?.status?.elapsed, match.minute);
    const homeGoals = num(detail?.goals?.home, match.homeGoals);
    const awayGoals = num(detail?.goals?.away, match.awayGoals);
    const totalGoals = homeGoals + awayGoals;
    const totalShots = snap.home.shots + snap.away.shots;
    const totalOnTarget = snap.home.onTarget + snap.away.onTarget;
    const totalCorners = snap.home.corners + snap.away.corners;
    const totalCards = snap.home.yellow + snap.home.red + snap.away.yellow + snap.away.red;
    const totalFouls = snap.home.fouls + snap.away.fouls;
    const targetDiff = snap.home.onTarget - snap.away.onTarget;
    const shotDiff = snap.home.shots - snap.away.shots;
    const possessionDiff = snap.home.possession - snap.away.possession;

    if (minute >= 55 && minute <= 88 && homeGoals !== awayGoals) {
      const side = homeGoals > awayGoals ? 'home' : 'away';
      const leader = side === 'home' ? match.home : match.away;
      const goalDiff = Math.abs(homeGoals-awayGoals);
      const statAdv = side === 'home'
        ? targetDiff >= 1 || shotDiff >= 4 || possessionDiff >= 8
        : targetDiff <= -1 || shotDiff <= -4 || possessionDiff <= -8;
      const row = bestOdd(odds, odd => isWinnerMarket(odd) && outcomeMatches(odd,match,side));
      if (row && statAdv) {
        const advTarget = side === 'home' ? targetDiff : -targetDiff;
        const advShots = side === 'home' ? shotDiff : -shotDiff;
        result.push(makeSignal(match,row,{
          marketType:'Resultado do jogo', bet:`${leader} vence`, rating:72 + goalDiff*5 + Math.max(0,advTarget)*3 + Math.max(0,advShots)/3 + (minute>=75?4:0),
          condition:`${leader} precisa terminar o tempo normal vencendo.`,
          why:[`${leader} lidera por ${Math.max(homeGoals,awayGoals)}-${Math.min(homeGoals,awayGoals)}`,`${leader} apresenta vantagem em indicadores ofensivos`,`Odd live ${formatOdd(row.odd)} disponível em ${row.bookmaker}`],
          risk:'Um gol adversário pode mudar completamente o mercado. O GRIEL Score não é garantia de acerto.'
        }));
      }
    }

    if (minute >= 40 && minute <= 82 && totalOnTarget >= 4 && totalShots >= 12) {
      const candidates = odds.filter(row => usableOdd(row) && isGoalsMarket(row) && isOver(row)).map(row=>({row,line:lineFromOdd(row)})).filter(x=>Number.isFinite(x.line) && x.line > totalGoals && x.line <= totalGoals + 1.5).sort((a,b)=>a.line-b.line || b.row.odd-a.row.odd);
      const pick = candidates[0];
      if (pick) {
        const need = Math.floor(pick.line)+1-totalGoals;
        const pace = totalOnTarget + totalShots/4;
        result.push(makeSignal(match,pick.row,{
          marketType:'Gols', bet:`Over ${pick.line.toFixed(1)} gols`, rating:66 + Math.min(15,totalOnTarget*2) + Math.min(8,totalShots/4) - Math.max(0,need-1)*7 - (minute>76?4:0),
          condition:`A partida precisa terminar com pelo menos ${Math.floor(pick.line)+1} gols.`,
          why:[`${totalShots} finalizações no total`,`${totalOnTarget} chutes no alvo`,`Ritmo ofensivo ${pace>=10?'alto':'ativo'} com linha live disponível`],
          risk:`Ainda faltam ${Math.max(1,need)} gol(s) para superar a linha. O ritmo pode cair.`
        }));
      }
    }

    if (minute >= 35 && minute <= 75 && ((homeGoals>0&&awayGoals===0)||(awayGoals>0&&homeGoals===0))) {
      const missing = homeGoals===0 ? snap.home : snap.away;
      const missingName = homeGoals===0 ? match.home : match.away;
      const row = bestOdd(odds, odd => isBttsMarket(odd) && isYes(odd));
      if (row && (missing.onTarget >= 2 || missing.shots >= 7)) {
        result.push(makeSignal(match,row,{
          marketType:'Ambas marcam', bet:'Ambas marcam — SIM', rating:69 + Math.min(12,missing.onTarget*3) + Math.min(7,missing.shots/2) - (minute>68?3:0),
          condition:`${missingName} precisa marcar pelo menos um gol.`,
          why:[`${missingName} ainda não marcou, mas tem ${missing.shots} finalizações`,`${missing.onTarget} tentativa(s) no alvo`,`Mercado live disponível a ${formatOdd(row.odd)}`],
          risk:`${missingName} pode continuar criando sem converter as chances.`
        }));
      }
    }

    if (minute >= 45 && totalCorners >= 4) {
      const candidates = odds.filter(row => usableOdd(row) && isCornersMarket(row) && isOver(row)).map(row=>({row,line:lineFromOdd(row)})).filter(x=>Number.isFinite(x.line) && x.line > totalCorners && x.line <= totalCorners+2.5).sort((a,b)=>a.line-b.line || b.row.odd-a.row.odd);
      const pick = candidates[0];
      if (pick) {
        const projected = totalCorners / Math.max(1,minute) * 90;
        if (projected >= pick.line) result.push(makeSignal(match,pick.row,{
          marketType:'Escanteios', bet:`Over ${pick.line.toFixed(1)} escanteios`, rating:67 + Math.min(13,totalCorners) + Math.min(8,Math.max(0,projected-pick.line)*2),
          condition:`A partida precisa terminar com pelo menos ${Math.floor(pick.line)+1} escanteios.`,
          why:[`${totalCorners} escanteios já cobrados`,`Ritmo projetado de ${projected.toFixed(1)} escanteios`,`Linha live disponível em ${pick.row.bookmaker}`],
          risk:'O ritmo de ataques e escanteios pode cair nos minutos finais.'
        }));
      }
    }

    if (minute >= 45 && totalCards >= 2 && totalFouls >= 14) {
      const candidates = odds.filter(row => usableOdd(row) && isCardsMarket(row) && isOver(row)).map(row=>({row,line:lineFromOdd(row)})).filter(x=>Number.isFinite(x.line) && x.line > totalCards && x.line <= totalCards+2).sort((a,b)=>a.line-b.line || b.row.odd-a.row.odd);
      const pick = candidates[0];
      if (pick) result.push(makeSignal(match,pick.row,{
        marketType:'Cartões', bet:`Over ${pick.line.toFixed(1)} cartões`, rating:65 + Math.min(12,totalCards*2) + Math.min(8,totalFouls/4),
        condition:`A partida precisa terminar com pelo menos ${Math.floor(pick.line)+1} cartões.`,
        why:[`${totalCards} cartão(ões) até agora`,`${totalFouls} faltas registradas`,`Mercado live disponível a ${formatOdd(pick.row.odd)}`],
        risk:'A arbitragem pode reduzir o número de advertências mesmo com muitas faltas.'
      }));
    }

    if (minute >= 55 && minute <= 82) {
      const dominant = targetDiff >= 2 || shotDiff >= 5 ? 'home' : targetDiff <= -2 || shotDiff <= -5 ? 'away' : null;
      if (dominant) {
        const row = bestOdd(odds, odd => isDoubleChance(odd) && doubleChanceMatches(odd,match,dominant));
        if (row) {
          const team = dominant==='home'?match.home:match.away;
          result.push(makeSignal(match,row,{
            marketType:'Dupla chance', bet:`${team} ou empate`, rating:70 + Math.abs(targetDiff)*2 + Math.min(7,Math.abs(shotDiff)),
            condition:`A entrada vence se ${team} vencer ou a partida terminar empatada.`,
            why:[`${team} apresenta maior volume ofensivo`,`Mercado cobre dois resultados`,`Odd live ${formatOdd(row.odd)} disponível`],
            risk:'A entrada perde se o adversário vencer a partida.'
          }));
        }
      }
    }

    const unique = [];
    const seen = new Set();
    result.sort((a,b)=>b.rating-a.rating).forEach(signal => {
      const key = `${signal.marketType}|${signal.bet}`;
      if (!seen.has(key) && signal.rating >= state.settings.minScore) {
        seen.add(key); unique.push(signal);
      }
    });
    return unique.slice(0,6);
  }

  async function openMatchCenter(fixtureId) {
    const match = state.matches.find(m => m.id === Number(fixtureId));
    if (!match) return;
    stopLivePolling();
    state.center.open = true;
    state.center.fixtureId = match.id;
    state.center.tab = 'overview';
    state.center.detail = match.raw || null;
    state.center.detailUpdatedAt = state.liveUpdatedAt;
    state.center.odds = [];
    state.center.oddsUpdatedAt = null;
    state.center.context = null;
    state.center.analysisMessage = '';
    $('#matchModalTitle').textContent = `${match.home} × ${match.away}`;
    $('#matchModal').showModal();
    renderMatchCenter();
    await loadMatchCenter(true);
    startMatchPolling();
  }

  function closeMatchCenter() {
    clearInterval(state.center.detailTimer);
    clearInterval(state.center.oddsTimer);
    state.center.detailTimer = null;
    state.center.oddsTimer = null;
    state.center.open = false;
    $('#matchModal').close();
    loadLive();
    startLivePolling();
  }

  async function loadMatchCenter(force = false) {
    if (!state.center.open || state.center.loading) return;
    const age = ageSeconds(state.center.detailUpdatedAt);
    if (!force && age !== null && age < 12) return;
    state.center.loading = true;
    try {
      const data = await api('matchcenter',{fixture:state.center.fixtureId});
      const detail = data.response?.[0] || null;
      if (detail) {
        state.center.detail = detail;
        state.center.detailUpdatedAt = data.updatedAt || new Date().toISOString();
        mergeDetailIntoMatch(detail);
      }
      recomputeCenterSignals();
      renderMatchCenter();
      renderDashboard();
      renderLive();
    } catch (error) {
      toast(`Central da partida: ${error.message}`);
    } finally {
      state.center.loading = false;
    }
  }

  function startMatchPolling() {
    clearInterval(state.center.detailTimer);
    state.center.detailTimer = setInterval(() => {
      if (state.center.open && document.visibilityState === 'visible') loadMatchCenter(true);
    }, MATCH_POLL_MS);
  }

  function oddsPollMs() {
    return Number(state.quota?.minuteLimit) > 10 ? (CONFIG.oddsPollMsPaid || 15000) : (CONFIG.oddsPollMsFree || 30000);
  }

  async function loadOdds(force = false) {
    if (!state.center.open || state.center.oddsLoading) return;
    const age = ageSeconds(state.center.oddsUpdatedAt);
    if (!force && age !== null && age < 12) return;
    state.center.oddsLoading = true;
    renderMatchCenter();
    try {
      const data = await api('odds',{fixture:state.center.fixtureId});
      state.center.odds = flattenOdds(data.response);
      state.center.oddsUpdatedAt = data.updatedAt || new Date().toISOString();
      recomputeCenterSignals();
      renderMatchCenter();
    } catch (error) {
      state.center.analysisMessage = `Odds indisponíveis agora: ${error.message}`;
      renderMatchCenter();
    } finally {
      state.center.oddsLoading = false;
    }
  }

  function startOddsPolling() {
    clearInterval(state.center.oddsTimer);
    if (!['odds','analysis'].includes(state.center.tab)) return;
    state.center.oddsTimer = setInterval(() => {
      if (state.center.open && ['odds','analysis'].includes(state.center.tab) && document.visibilityState === 'visible') loadOdds(true);
    }, oddsPollMs());
  }

  async function loadContext() {
    if (!state.center.open || state.center.contextLoading || state.center.context) return;
    const match = state.matches.find(m=>m.id===state.center.fixtureId);
    if (!match) return;
    if (Number.isFinite(state.quota?.minuteRemaining) && state.quota.minuteRemaining < 2) {
      state.center.analysisMessage = 'Contexto aguardando janela de cota da API. Tente novamente em alguns segundos.';
      renderMatchCenter();
      return;
    }
    state.center.contextLoading = true;
    renderMatchCenter();
    try {
      const data = await api('context',{fixture:match.id,home:match.homeId,away:match.awayId});
      state.center.context = data;
      renderMatchCenter();
    } catch (error) {
      state.center.analysisMessage = `Contexto indisponível: ${error.message}`;
      renderMatchCenter();
    } finally {
      state.center.contextLoading = false;
    }
  }

  function recomputeCenterSignals() {
    if (!state.center.open || state.center.tab !== 'analysis' || !state.center.detail || !state.center.odds.length) return;
    const match = state.matches.find(m=>m.id===state.center.fixtureId);
    if (!match) return;
    const signals = generateSignals(match,state.center.detail,state.center.odds);
    state.signals = state.signals.filter(s=>s.fixtureId!==match.id).concat(signals).sort((a,b)=>b.rating-a.rating);
    state.center.analysisMessage = signals.length
      ? `${signals.length} sinal(is) validado(s) na leitura atual.`
      : 'Nenhum sinal validado na leitura atual.';
    renderDashboard();
    renderSignals();
  }

  async function runAnalysis(fixtureId = state.center.fixtureId) {
    let match = state.matches.find(m=>m.id===Number(fixtureId));
    if (!match) return;

    if (!state.center.open || state.center.fixtureId !== match.id) {
      await openMatchCenter(match.id);
      state.center.tab = 'analysis';
      renderMatchCenter();
    } else {
      state.center.tab = 'analysis';
      renderMatchCenter();
      if (state.center.loading) {
        const started = Date.now();
        while (state.center.loading && Date.now() - started < 10000) {
          await new Promise(resolve => setTimeout(resolve, 120));
        }
      }
      if (!state.center.detail?.statistics?.length) await loadMatchCenter(true);
    }

    match = state.matches.find(m=>m.id===Number(fixtureId)) || match;
    await loadOdds(false);
    startOddsPolling();
    const detail = state.center.detail;
    const signals = generateSignals(match,detail,state.center.odds);
    state.signals = state.signals.filter(s=>s.fixtureId!==match.id).concat(signals).sort((a,b)=>b.rating-a.rating);
    recordSignals(signals);
    renderDashboard();
    renderSignals();
    state.center.analysisMessage = signals.length
      ? `${signals.length} sinal(is) validado(s) com estatísticas e odds live.`
      : 'Nenhum sinal validado agora. O motor não encontrou combinação suficiente de estatísticas + mercado + odd.';
    renderMatchCenter();
    if (signals.length) {
      notifySignal(signals[0]);
      toast(`Melhor sinal: ${signals[0].bet} @ ${formatOdd(signals[0].odd)}`);
    } else {
      toast('Nenhum sinal validado nesta leitura.');
    }
  }

  function notifySignal(signal) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    try { new Notification('GRIEL Signal', {body:`${signal.home} × ${signal.away}\n${signal.bet} @ ${formatOdd(signal.odd)}`}); } catch {}
  }

  function renderMatchCenter() {
    if (!state.center.open) return;
    const match = state.matches.find(m=>m.id===state.center.fixtureId);
    const detail = state.center.detail || match?.raw;
    if (!match || !detail) {
      $('#matchModalBody').innerHTML = `<div class="empty">Carregando Central da Partida...</div>`;
      return;
    }

    const current = fixtureToMatch(detail);
    const tabs = [
      ['overview','Visão geral'],['stats','Estatísticas'],['timeline','Linha do tempo'],['lineups','Escalações'],
      ['players','Jogadores'],['odds','Odds live'],['analysis','GRIEL'],['context','Contexto']
    ];

    $('#matchModalBody').innerHTML = `
      ${centerScoreboard(current)}
      <div class="mc-tabs">${tabs.map(([id,label])=>`<button class="${state.center.tab===id?'active':''}" data-center-tab="${id}">${label}</button>`).join('')}</div>
      <section class="mc-panel ${state.center.tab==='overview'?'active':''}" data-panel="overview">${overviewPanel(current,detail)}</section>
      <section class="mc-panel ${state.center.tab==='stats'?'active':''}" data-panel="stats">${statsPanel(detail)}</section>
      <section class="mc-panel ${state.center.tab==='timeline'?'active':''}" data-panel="timeline">${timelinePanel(detail)}</section>
      <section class="mc-panel ${state.center.tab==='lineups'?'active':''}" data-panel="lineups">${lineupsPanel(detail)}</section>
      <section class="mc-panel ${state.center.tab==='players'?'active':''}" data-panel="players">${playersPanel(detail)}</section>
      <section class="mc-panel ${state.center.tab==='odds'?'active':''}" data-panel="odds">${oddsPanel()}</section>
      <section class="mc-panel ${state.center.tab==='analysis'?'active':''}" data-panel="analysis">${analysisPanel(current,detail)}</section>
      <section class="mc-panel ${state.center.tab==='context'?'active':''}" data-panel="context">${contextPanel(current)}</section>`;
    wireImageFallbacks($('#matchModalBody'));
  }

  function centerScoreboard(match) {
    return `<div class="mc-scoreboard">
      <div class="mc-team">${crest(match.homeLogo,match.home)}<b>${esc(match.home)}</b></div>
      <div class="mc-score"><strong>${match.homeGoals} - ${match.awayGoals}</strong><b>${minuteLabel(match)}</b><small>${esc(match.status)} • sync ${ageLabel(state.center.detailUpdatedAt)}</small></div>
      <div class="mc-team">${crest(match.awayLogo,match.away)}<b>${esc(match.away)}</b></div>
    </div>`;
  }

  function eventPosition(event, match, index) {
    const home = event?.team?.id === match.homeId;
    const type = norm(event?.type);
    let x = home ? 30 : 70;
    let y = 18 + ((index * 23) % 64);
    if (type.includes('goal')) x = home ? 84 : 16;
    if (type.includes('subst')) y = 8;
    if (type.includes('var')) x = 50;
    return {x,y,home};
  }

  function pitchHtml(match, events) {
    const recent = events.slice(-9);
    const markers = recent.map((event,index) => {
      const pos = eventPosition(event,match,index);
      return `<button class="event-marker ${pos.home?'home':'away'}" style="left:${pos.x}%;top:${pos.y}%" title="${esc(eventTitle(event))} ${eventMinute(event)}">${eventIcon(event)}</button>`;
    }).join('');
    const last = recent[recent.length-1];
    return `<div class="pitch-card"><div class="section-title"><b>Campo de eventos</b><small>visual editorial; sem coordenadas físicas do provedor</small></div><div class="pitch"><div class="penalty-box left"></div><div class="penalty-box right"></div>${markers}</div>${last?`<div class="last-event"><span>${eventIcon(last)}</span><div><b>${esc(eventTitle(last))} • ${eventMinute(last)}</b><small>${esc([last.team?.name,last.player?.name,last.assist?.name?`Assist.: ${last.assist.name}`:''].filter(Boolean).join(' • '))}</small></div></div>`:`<div class="last-event"><span>●</span><div><b>Aguardando evento oficial</b><small>O mapa usa apenas os incidentes realmente recebidos.</small></div></div>`}</div>`;
  }

  function overviewPanel(match, detail) {
    const events = Array.isArray(detail.events) ? detail.events : [];
    const recent = [...events].reverse().slice(0,8);
    return `<div class="mc-grid">${pitchHtml(match,events)}<div class="timeline-card"><div class="section-title"><b>Eventos recentes</b><small>${events.length} evento(s)</small></div><div class="timeline">${recent.length?recent.map(timelineRow).join(''):`<div class="empty">Nenhum evento detalhado retornado.</div>`}</div></div></div>`;
  }

  function timelineRow(event) {
    return `<div class="timeline-row"><span>${eventMinute(event)}</span><span>${eventIcon(event)}</span><div><b>${esc(eventTitle(event))}</b><small>${esc([event.team?.name,event.player?.name,event.assist?.name?`Assist.: ${event.assist.name}`:''].filter(Boolean).join(' • '))}</small></div></div>`;
  }

  function timelinePanel(detail) {
    const events = Array.isArray(detail.events) ? [...detail.events].reverse() : [];
    return `<div class="timeline-card"><div class="section-title"><b>Linha do tempo completa</b><small>eventos oficiais</small></div><div class="timeline">${events.length?events.map(timelineRow).join(''):`<div class="empty">Sem eventos detalhados para esta partida.</div>`}</div></div>`;
  }

  function statDisplay(value) { return value === null || value === undefined ? '—' : String(value); }
  function statPair(detail, type) {
    const stats = Array.isArray(detail.statistics) ? detail.statistics : [];
    return [statValue(stats[0]?.statistics || [],type),statValue(stats[1]?.statistics || [],type)];
  }
  function statBar(label, pair) {
    const a = num(pair[0],0), b = num(pair[1],0), total = a+b || 1;
    const left = clamp(Math.round(a/total*100),5,95), right = 100-left;
    return `<div class="stat-row"><div class="stat-values"><b>${esc(statDisplay(pair[0]))}</b><span>${esc(label)}</span><b>${esc(statDisplay(pair[1]))}</b></div><div class="dual-bar"><i style="width:${left}%"></i><i style="width:${right}%"></i></div></div>`;
  }

  function statsPanel(detail) {
    if (!Array.isArray(detail.statistics) || detail.statistics.length<2) return `<div class="empty">Estatísticas ainda não disponíveis para esta competição/partida.</div>`;
    const rows = [
      ['Finalizações','Total Shots'],['No alvo','Shots on Goal'],['Posse','Ball Possession'],['Escanteios','Corner Kicks'],
      ['Faltas','Fouls'],['Amarelos','Yellow Cards'],['Vermelhos','Red Cards'],['Defesas','Goalkeeper Saves'],['xG','expected_goals']
    ];
    return `<div class="stats-card"><div class="section-title"><b>Estatísticas ao vivo</b><small>o provedor atualiza estatísticas em ritmo próprio</small></div><div class="stats-grid">${rows.map(([label,type])=>statBar(label,statPair(detail,type))).join('')}</div></div>`;
  }

  function lineupsPanel(detail) {
    const lineups = Array.isArray(detail.lineups) ? detail.lineups : [];
    if (!lineups.length) return `<div class="empty">Escalações não disponíveis nesta partida.</div>`;
    return `<div class="lineups">${lineups.slice(0,2).map(team => `<div class="lineup-card"><div class="section-title"><b>${esc(team.team?.name || 'Time')}</b><small>${esc(team.formation || 'formação —')}</small></div><div class="lineup-head">${team.team?.logo?crest(team.team.logo,team.team.name):''}<div><b>Técnico: ${esc(team.coach?.name || '—')}</b></div></div><ol>${(team.startXI||[]).map(player=>`<li><span>${esc(player.player?.number || '•')}</span><b>${esc(player.player?.name || 'Jogador')}</b><small>${esc(player.player?.pos || '')}</small></li>`).join('')}</ol></div>`).join('')}</div>`;
  }

  function playerRating(player) {
    const stat = player?.statistics?.[0] || {};
    const rating = Number(stat.games?.rating);
    return Number.isFinite(rating) ? rating : 0;
  }

  function playersPanel(detail) {
    const blocks = Array.isArray(detail.players) ? detail.players : [];
    if (!blocks.length) return `<div class="empty">Estatísticas individuais ainda não disponíveis.</div>`;
    return `<div class="players-grid">${blocks.slice(0,2).map(block=>`<div class="players-card"><div class="section-title"><b>${esc(block.team?.name || 'Time')}</b><small>melhores avaliações</small></div>${(block.players||[]).sort((a,b)=>playerRating(b)-playerRating(a)).slice(0,8).map(item=>{const st=item.statistics?.[0]||{};return `<div class="player-card"><div><b>${esc(item.player?.name || 'Jogador')}</b><small>${esc(st.games?.position || '')} • G ${num(st.goals?.total,0)} • A ${num(st.goals?.assists,0)}</small></div><b class="rating">${playerRating(item)?playerRating(item).toFixed(1):'—'}</b></div>`}).join('')}</div>`).join('')}</div>`;
  }

  function oddsCategory(row) {
    if (isWinnerMarket(row) || isDoubleChance(row)) return 'result';
    if (isGoalsMarket(row) || isBttsMarket(row)) return 'goals';
    if (isCornersMarket(row)) return 'corners';
    if (isCardsMarket(row)) return 'cards';
    return 'other';
  }

  function oddsPanel() {
    if (state.center.oddsLoading && !state.center.odds.length) return `<div class="empty">Carregando odds ao vivo...</div>`;
    if (!state.center.odds.length) return `<div class="odds-card"><div class="section-title"><b>Odds ao vivo</b><small>sob demanda</small></div><div class="analysis-empty"><p>A API não retornou odds para esta partida ainda, ou elas não estão disponíveis para esta competição.</p><button class="btn secondary" data-load-odds>Consultar novamente</button></div></div>`;
    const filter = state.center.oddsFilter;
    const rows = state.center.odds.filter(row => filter==='all' || oddsCategory(row)===filter).slice(0,80);
    return `<div class="odds-card"><div class="section-title"><b>Odds ao vivo</b><small>sync ${ageLabel(state.center.oddsUpdatedAt)} • atualização automática ${Math.round(oddsPollMs()/1000)}s</small></div><div class="odds-toolbar">${[['all','Todos'],['result','Resultado'],['goals','Gols'],['corners','Escanteios'],['cards','Cartões']].map(([id,label])=>`<button class="${filter===id?'active':''}" data-odd-filter="${id}">${label}</button>`).join('')}</div><div class="odds-list">${rows.length?rows.map(row=>`<div class="odd-row"><div><span>Mercado</span><b>${esc(row.market)}</b></div><div><span>Opção</span><b>${esc(row.choice)}${row.handicap!==null?` · ${esc(row.handicap)}`:''}</b></div><div><span>Bookmaker</span><b>${esc(row.bookmaker)}</b></div><div><span>Odd</span><b>${formatOdd(row.odd)}</b></div></div>`).join(''):`<div class="empty">Nenhum mercado neste filtro.</div>`}</div></div>`;
  }

  function analysisPanel(match, detail) {
    const signals = state.signals.filter(s=>s.fixtureId===match.id);
    const snap = statSnapshot(detail);
    const summary = snap ? `${snap.home.shots+snap.away.shots} finalizações • ${snap.home.onTarget+snap.away.onTarget} no alvo • ${snap.home.corners+snap.away.corners} escanteios` : 'Aguardando estatísticas completas';
    return `<div class="analysis-card"><div class="section-title"><b>GRIEL Engine</b><small>${esc(summary)}</small></div>${state.center.analysisMessage?`<div class="api-status">${esc(state.center.analysisMessage)}</div>`:''}${signals.length?`<div class="live-actions" style="margin-bottom:12px"><button class="btn secondary" data-run-analysis>Reanalisar agora</button></div><div class="signal-grid">${signals.map(s=>signalCard(s)).join('')}</div>`:`<div class="analysis-empty"><b>Nenhum sinal validado ainda.</b><p>O motor precisa de estatísticas reais + mercado live + odd dentro do filtro configurado.</p><button class="btn primary" data-run-analysis>Analisar agora</button></div>`}</div>`;
  }

  function contextPanel(match) {
    if (state.center.contextLoading) return `<div class="empty">Carregando prediction e H2H...</div>`;
    const ctx = state.center.context;
    if (!ctx) return `<div class="context-card"><div class="analysis-empty"><p>Contexto é carregado somente quando necessário para economizar cota.</p><button class="btn secondary" data-load-context>Carregar contexto</button></div></div>`;
    const pred = ctx.prediction?.[0]?.predictions || null;
    const h2h = Array.isArray(ctx.h2h) ? ctx.h2h : [];
    return `<div class="context-grid"><div class="context-box"><h4>Prediction do provedor</h4>${pred?`<p>Vencedor indicado: <b>${esc(pred.winner?.name || '—')}</b></p><p>Conselho: ${esc(pred.advice || '—')}</p><p>Casa ${esc(pred.percent?.home || '—')} · Empate ${esc(pred.percent?.draw || '—')} · Fora ${esc(pred.percent?.away || '—')}</p>`:`<p>Prediction indisponível.</p>`}</div><div class="context-box"><h4>Últimos confrontos</h4>${h2h.length?h2h.map(game=>`<div class="h2h-row"><span>${esc(game.teams?.home?.name || '')} ${num(game.goals?.home,0)} - ${num(game.goals?.away,0)} ${esc(game.teams?.away?.name || '')}</span><small>${game.fixture?.date?new Date(game.fixture.date).toLocaleDateString('pt-BR'):''}</small></div>`).join(''):`<p>H2H indisponível.</p>`}</div></div>`;
  }

  function switchCenterTab(tab) {
    state.center.tab = tab;
    renderMatchCenter();
    clearInterval(state.center.oddsTimer);
    if (tab === 'odds' || tab === 'analysis') {
      loadOdds(false);
      startOddsPolling();
    }
    if (tab === 'context') loadContext();
  }

  function renderSettings() {
    $('#minScore').value = state.settings.minScore;
    $('#minScoreOut').textContent = state.settings.minScore;
    $('#minOdd').value = state.settings.minOdd;
    $('#maxOdd').value = state.settings.maxOdd;
    $('#apiStatus').innerHTML = state.mode === 'live'
      ? `<b>GRIEL Live conectado.</b><br>${state.matches.length} jogo(s) • sync ${ageLabel(state.liveUpdatedAt)} • ${quotaLabel()}`
      : `<b>Reconectando ao backend.</b><br>${esc(state.liveError || 'Aguardando resposta...')}`;
  }

  function saveSettings() {
    state.settings = {
      minScore:clamp(num($('#minScore').value,72),60,95),
      minOdd:Math.max(1.01,num($('#minOdd').value,1.35)),
      maxOdd:Math.max(1.01,num($('#maxOdd').value,3.0))
    };
    if (state.settings.maxOdd < state.settings.minOdd) [state.settings.minOdd,state.settings.maxOdd] = [state.settings.maxOdd,state.settings.minOdd];
    localStorage.setItem('grielSettingsV9',JSON.stringify(state.settings));
    renderSettings();
    toast('Filtros do GRIEL salvos.');
  }

  async function testBackend() {
    $('#apiStatus').textContent = 'Testando backend...';
    try {
      const data = await api('health');
      $('#apiStatus').innerHTML = `<b>Backend operacional.</b><br>Versão ${esc(data.version || '9.0')} • chave ${data.configured?'configurada':'não configurada'} • ${new Date(data.now).toLocaleTimeString('pt-BR')}`;
      toast('Backend GRIEL operacional.');
    } catch (error) {
      $('#apiStatus').innerHTML = `<b>Falha no teste.</b><br>${esc(error.message)}`;
    }
  }

  function exportHistory() {
    const rows = [['Horário','Jogo','Entrada','Odd','GRIEL','Status'],...state.history.map(i=>[i.time,i.game,i.bet,i.odd,i.rating,i.status])];
    const csv = rows.map(row=>row.map(cell=>`"${String(cell??'').replace(/"/g,'""')}"`).join(';')).join('\n');
    const blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url;a.download='griel-historico.csv';a.click();URL.revokeObjectURL(url);
  }

  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(()=>el.classList.remove('show'),3000);
  }

  function bindEvents() {
    document.addEventListener('click', event => {
      const pageBtn = event.target.closest('[data-page]');
      const goBtn = event.target.closest('[data-go]');
      const matchBtn = event.target.closest('[data-open-match]');
      const analysisBtn = event.target.closest('[data-quick-analysis]');
      const tabBtn = event.target.closest('[data-center-tab]');
      const oddsFilter = event.target.closest('[data-odd-filter]');
      if (pageBtn) setPage(pageBtn.dataset.page);
      if (goBtn) setPage(goBtn.dataset.go);
      if (matchBtn) openMatchCenter(Number(matchBtn.dataset.openMatch));
      if (analysisBtn) runAnalysis(Number(analysisBtn.dataset.quickAnalysis));
      if (tabBtn) switchCenterTab(tabBtn.dataset.centerTab);
      if (oddsFilter) { state.center.oddsFilter=oddsFilter.dataset.oddFilter; renderMatchCenter(); }
      if (event.target.closest('[data-load-odds]')) loadOdds(true);
      if (event.target.closest('[data-run-analysis]')) runAnalysis();
      if (event.target.closest('[data-load-context]')) loadContext();
    });

    $('#refreshBtn').addEventListener('click', () => state.center.open ? loadMatchCenter(true) : loadLive({manual:true}));
    $('#notifyBtn').addEventListener('click', async () => {
      if (!('Notification' in window)) return toast('Este navegador não suporta notificações.');
      const permission = await Notification.requestPermission();
      toast(permission==='granted'?'Alertas do navegador ativados.':'Permissão de notificação não concedida.');
    });
    $('#closeMatchModal').addEventListener('click', closeMatchCenter);
    $('#matchModal').addEventListener('cancel', event => { event.preventDefault(); closeMatchCenter(); });
    $('#matchSearch').addEventListener('input',renderLive);
    $('#leagueFilter').addEventListener('change',renderLive);
    $('#signalSearch').addEventListener('input',renderSignals);
    $('#signalMarketFilter').addEventListener('change',renderSignals);
    $('#signalScoreFilter').addEventListener('change',renderSignals);
    $('#stakeInput').addEventListener('input',calculateReturn);
    $('#oddInput').addEventListener('input',calculateReturn);
    $('#minScore').addEventListener('input',event=>$('#minScoreOut').textContent=event.target.value);
    $('#saveSettings').addEventListener('click',saveSettings);
    $('#testBackend').addEventListener('click',testBackend);
    $('#exportHistory').addEventListener('click',exportHistory);
    $('#clearHistory').addEventListener('click',()=>{ if(confirm('Limpar o histórico local de sinais?')){state.history=[];saveHistory();renderHistory();} });
    document.addEventListener('visibilitychange',()=>{
      if (document.visibilityState==='hidden') return;
      if (state.center.open) loadMatchCenter(true); else loadLive();
    });
  }

  function renderStatic() {
    renderMarkets(); renderAcademy(); renderHistory(); renderSettings(); renderDashboard(); renderLive(); renderSignals();
  }

  async function init() {
    bindEvents();
    renderStatic();
    state.runtimeTimer = setInterval(updateRuntimeLabels,1000);
    updateRuntimeLabels();
    await loadLive();
    startLivePolling();
  }

  init();
})();
