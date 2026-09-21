const demoMatches = [
  {
    id: 1,
    home: 'Barcelona',
    away: 'Roma',
    league: 'Champions Cup • Internacional',
    minute: 67,
    score: '2-1',
    status: '2º tempo',
    shots: '18-9',
    onTarget: '9-4',
    corners: '7-3',
    cards: '1-2',
    possession: '61%-39%',
    pressure: 'Alta',
    markets: [
      { type: 'Resultado do jogo', bet: 'Barcelona vence', odd: 1.62, score: 91, condition: 'O Barcelona precisa vencer no tempo normal.', why: ['Barcelona lidera o placar', 'Volume ofensivo superior', '9 chutes no alvo'], risk: 'A Roma ainda pode empatar ou virar.' },
      { type: 'Over gols', bet: 'Over 2.5 gols', odd: 1.48, score: 88, condition: 'O jogo precisa terminar com 3 ou mais gols.', why: ['Já existem 3 gols no placar'], risk: 'Mercado já estaria atendido neste cenário demonstrativo.' },
      { type: 'Ambas marcam', bet: 'Ambas marcam — SIM', odd: 1.22, score: 95, condition: 'Os dois times precisam marcar pelo menos 1 gol.', why: ['Barcelona marcou', 'Roma marcou'], risk: 'Mercado já estaria atendido neste cenário demonstrativo.' },
      { type: 'Escanteios', bet: 'Over 9.5 escanteios', odd: 1.74, score: 79, condition: 'A partida precisa ter 10 ou mais escanteios.', why: ['Já há 10 escanteios no total'], risk: 'Mercado já estaria atendido neste cenário demonstrativo.' },
      { type: 'Dupla chance', bet: 'Barcelona ou empate', odd: 1.18, score: 93, condition: 'Barcelona não pode perder.', why: ['Time da casa controla a partida'], risk: 'Odd naturalmente menor.' }
    ]
  },
  {
    id: 2,
    home: 'Palmeiras',
    away: 'Fortaleza',
    league: 'Brasil • Série A',
    minute: 63,
    score: '1-0',
    status: '2º tempo',
    shots: '15-7',
    onTarget: '7-2',
    corners: '6-2',
    cards: '2-1',
    possession: '58%-42%',
    pressure: 'Alta',
    markets: [
      { type: 'Over gols', bet: 'Over 1.5 gols', odd: 1.72, score: 86, condition: 'A partida precisa terminar com pelo menos 2 gols no total.', why: ['22 finalizações', '9 chutes no alvo', '1 gol já marcado'], risk: 'Pode não sair mais nenhum gol.' },
      { type: 'Resultado do jogo', bet: 'Palmeiras vence', odd: 1.54, score: 84, condition: 'O Palmeiras precisa confirmar a vitória no tempo normal.', why: ['Vence por 1-0', 'Domina os chutes', 'Pressão alta'], risk: 'O Fortaleza pode empatar no fim.' },
      { type: 'Total do time', bet: 'Palmeiras mais de 1.5 gols', odd: 2.05, score: 74, condition: 'O Palmeiras precisa marcar pelo menos 2 gols no jogo.', why: ['Cria muito', '7 chutes no alvo'], risk: 'Mesmo melhor, pode terminar com apenas 1 gol.' },
      { type: 'Escanteios', bet: 'Over 8.5 escanteios', odd: 1.68, score: 82, condition: 'A partida precisa ter 9 ou mais escanteios.', why: ['Já tem 8 escanteios'], risk: 'O ritmo pode cair.' }
    ]
  },
  {
    id: 3,
    home: 'Milan',
    away: 'Torino',
    league: 'Itália • Série A',
    minute: 71,
    score: '0-0',
    status: '2º tempo',
    shots: '18-8',
    onTarget: '6-2',
    corners: '8-4',
    cards: '1-3',
    possession: '56%-44%',
    pressure: 'Alta',
    markets: [
      { type: 'Over gols', bet: 'Over 0.5 gols', odd: 1.64, score: 82, condition: 'A partida precisa terminar com pelo menos 1 gol.', why: ['26 finalizações', '8 chutes no alvo', 'Pressão alta nos minutos finais'], risk: 'Mesmo criando muito, o jogo pode terminar 0-0.' },
      { type: 'Resultado do jogo', bet: 'Milan vence', odd: 2.10, score: 72, condition: 'O Milan precisa fazer o gol da vitória.', why: ['Milan finaliza mais'], risk: 'O empate ainda é muito possível.' },
      { type: 'Escanteios', bet: 'Over 10.5 escanteios', odd: 1.59, score: 87, condition: 'A partida precisa ter 11 ou mais escanteios.', why: ['Já possui 12 escanteios'], risk: 'Mercado já estaria atendido neste cenário demonstrativo.' }
    ]
  },
  {
    id: 4,
    home: 'Benfica',
    away: 'Braga',
    league: 'Portugal • Liga',
    minute: 58,
    score: '1-1',
    status: '2º tempo',
    shots: '12-10',
    onTarget: '5-4',
    corners: '4-5',
    cards: '2-2',
    possession: '52%-48%',
    pressure: 'Média/Alta',
    markets: [
      { type: 'Over gols', bet: 'Over 2.5 gols', odd: 1.88, score: 78, condition: 'A partida precisa terminar com pelo menos 3 gols.', why: ['O placar já tem 2 gols', '9 chutes no alvo'], risk: 'O ritmo pode cair e ficar no 1-1.' },
      { type: 'Resultado do jogo', bet: 'Benfica vence', odd: 2.35, score: 69, condition: 'O Benfica precisa marcar e sair vencedor.', why: ['Jogo em casa', 'Produção ofensiva equilibrada'], risk: 'Mercado mais agressivo.' },
      { type: 'Ambas marcam', bet: 'Ambas marcam — SIM', odd: 1.20, score: 97, condition: 'Ambos os times precisam marcar.', why: ['Os dois já marcaram'], risk: 'Mercado já estaria atendido neste cenário demonstrativo.' }
    ]
  }
];

const academyContent = [
  { title: 'Resultado do jogo', text: 'Você aposta em qual time vence no tempo normal ou se haverá empate.', example: 'Ex.: “Barcelona vence” = o Barcelona precisa ganhar a partida.' },
  { title: 'Dupla chance', text: 'Você cobre 2 resultados em vez de 1.', example: 'Ex.: “Barcelona ou empate” = só perde se a Roma vencer.' },
  { title: 'Empate anula', text: 'Se der empate, a aposta é anulada / devolvida.', example: 'Ex.: “Palmeiras empate anula” = perde apenas se o Fortaleza vencer.' },
  { title: 'Over 0.5 / 1.5 / 2.5 gols', text: 'Significa que o jogo precisa ter mais gols do que a linha indicada.', example: 'Over 2.5 = 3 ou mais gols no total.' },
  { title: 'Ambas marcam', text: 'Os dois times precisam marcar pelo menos 1 gol cada.', example: '1-1 atende. 2-0 não atende.' },
  { title: 'Total de gols do time', text: 'Analisa apenas a quantidade de gols de um dos times.', example: '“Barcelona mais de 1.5 gols” = o Barcelona precisa fazer 2 ou mais.' },
  { title: 'Escanteios', text: 'Mercado baseado no total de escanteios da partida ou de um time.', example: 'Over 8.5 escanteios = 9 ou mais escanteios.' },
  { title: 'Cartões', text: 'Mercado baseado na quantidade de cartões da partida ou de um time.', example: 'Over 3.5 cartões = 4 ou mais cartões no jogo.' },
  { title: 'Odd', text: 'É a cotação usada para calcular o retorno bruto em caso de acerto.', example: 'R$ 20 × odd 1.80 = R$ 36 de retorno bruto.' }
];

const marketCatalog = [
  {
    name: 'Resultado do jogo',
    desc: 'Mercado clássico de vencedor no tempo normal.',
    items: ['Casa vence', 'Visitante vence', 'Empate', 'Empate anula', 'Dupla chance']
  },
  {
    name: 'Gols da partida',
    desc: 'Mercados que analisam total de gols do jogo.',
    items: ['Over 0.5', 'Over 1.5', 'Over 2.5', 'Under 2.5', 'Próximo gol']
  },
  {
    name: 'Gols por equipe',
    desc: 'Mercados focados em um time específico.',
    items: ['Time da casa marca', 'Visitante marca', 'Mais de 0.5 do time', 'Mais de 1.5 do time']
  },
  {
    name: 'Ambas marcam',
    desc: 'Verifica se os dois times marcam pelo menos uma vez.',
    items: ['Sim', 'Não']
  },
  {
    name: 'Escanteios',
    desc: 'Mercados baseados no volume de escanteios do jogo.',
    items: ['Over 8.5', 'Over 9.5', 'Escanteios do mandante', 'Escanteios do visitante']
  },
  {
    name: 'Cartões',
    desc: 'Mercados com base em advertências e expulsões.',
    items: ['Over 3.5 cartões', 'Cartões do mandante', 'Cartões do visitante']
  }
];

const phraseLibrary = [
  'O que apostar: Barcelona vence. Para dar certo, o Barcelona precisa ganhar a partida.',
  'O que apostar: Over 2.5 gols. Para dar certo, o jogo precisa ter 3 ou mais gols no total.',
  'O que apostar: Ambas marcam — SIM. Para dar certo, os dois times precisam marcar.',
  'O que apostar: Over 8.5 escanteios. Para dar certo, a partida precisa ter pelo menos 9 escanteios.',
  'O que apostar: Palmeiras mais de 1.5 gols. Para dar certo, o Palmeiras precisa fazer 2 ou mais gols.'
];

const historyRowsData = [
  ['21/09/2026', 'Barcelona × Roma', 'Barcelona vence', '1.62', '91', 'GREEN'],
  ['21/09/2026', 'Palmeiras × Fortaleza', 'Over 1.5 gols', '1.72', '86', 'GREEN'],
  ['21/09/2026', 'Milan × Torino', 'Milan vence', '2.10', '72', 'RED'],
  ['20/09/2026', 'Benfica × Braga', 'Over 2.5 gols', '1.88', '78', 'GREEN'],
  ['20/09/2026', 'Roma × Lazio', 'Ambas marcam — SIM', '1.70', '80', 'RED']
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const LIVE_ENDPOINT = '/api/griel';
const appState = {
  matches: [],
  signals: [],
  mode: 'loading',
  connected: false,
  lastUpdated: null,
  liveError: '',
  quota: null,
  refreshTimer: null,
  analysisCache: new Map(),
  matchCenterCache: new Map(),
  analyzing: new Set()
};

const LIVE_REFRESH_MS = 15000;

function translateStatus(value){
  const map = {
    'First Half': '1º tempo',
    'Second Half': '2º tempo',
    'Halftime': 'Intervalo',
    'Extra Time': 'Prorrogação',
    'Penalty In Progress': 'Pênaltis',
    'Break Time': 'Pausa',
    'Match Finished': 'Encerrado'
  };
  return map[value] || value || 'Ao vivo';
}

function ageSeconds(iso){
  if (!iso) return null;
  const ms = Date.now() - new Date(iso).getTime();
  return Number.isFinite(ms) ? Math.max(0, Math.round(ms / 1000)) : null;
}

function freshnessText(){
  const age = ageSeconds(appState.lastUpdated);
  if (age === null) return 'Sincronizando';
  if (age < 5) return 'Atualizado agora';
  if (age < 60) return `Atualizado há ${age}s`;
  return `Atualizado há ${Math.floor(age/60)}min`;
}


function safeNumber(value, fallback = 0){
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function formatOdd(value){
  const n = Number(value);
  return Number.isFinite(n) && n > 1 ? n.toFixed(2) : 'Consultar';
}

function fixtureToMatch(item){
  const fixture = item.fixture || {};
  const status = fixture.status || {};
  const league = item.league || {};
  const teams = item.teams || {};
  const goals = item.goals || {};
  const minute = safeNumber(status.elapsed, 0);
  const extra = safeNumber(status.extra, 0);
  const homeGoals = safeNumber(goals.home, 0);
  const awayGoals = safeNumber(goals.away, 0);
  return {
    id: fixture.id,
    home: teams.home?.name || 'Mandante',
    away: teams.away?.name || 'Visitante',
    homeId: teams.home?.id || null,
    awayId: teams.away?.id || null,
    homeLogo: teams.home?.logo || '',
    awayLogo: teams.away?.logo || '',
    leagueLogo: league.logo || '',
    flag: league.flag || '',
    venue: fixture.venue?.name || '',
    city: fixture.venue?.city || '',
    referee: fixture.referee || '',
    league: [league.country, league.name].filter(Boolean).join(' • ') || 'Competição',
    round: league.round || '',
    minute,
    extra,
    score: `${homeGoals}-${awayGoals}`,
    status: translateStatus(status.long || status.short || 'Ao vivo'),
    statusShort: status.short || '',
    events: Array.isArray(item.events) ? item.events : [],
    shots: 'sob demanda',
    onTarget: 'sob demanda',
    corners: 'sob demanda',
    cards: 'sob demanda',
    possession: 'sob demanda',
    pressure: 'Aguardando análise',
    markets: []
  };
}

function minuteLabel(match){
  const minute = safeNumber(match?.minute, 0);
  const extra = safeNumber(match?.extra, 0);
  if (extra > 0) return `${minute}'+${extra}`;
  return `${minute}'`;
}

function buildPreliminaryMarkets({home, away, minute, homeGoals, awayGoals}){
  const total = homeGoals + awayGoals;
  const markets = [];
  const lateFactor = Math.min(12, Math.max(0, minute - 55));

  if (minute >= 60 && homeGoals > awayGoals) {
    markets.push({
      type: 'Resultado do jogo',
      bet: `${home} vence`,
      odd: null,
      score: Math.min(82, 68 + lateFactor + Math.min(8, (homeGoals-awayGoals)*4)),
      condition: `${home} precisa terminar o tempo normal vencendo.`,
      why: [`${home} está vencendo por ${homeGoals}-${awayGoals}`, `Partida está aos ${minute}'`, 'Odd ao vivo disponível ao abrir os mercados'],
      risk: `${away} ainda pode empatar ou virar. Este é um sinal preliminar baseado em placar e minuto.`
    });
  }

  if (minute >= 60 && awayGoals > homeGoals) {
    markets.push({
      type: 'Resultado do jogo',
      bet: `${away} vence`,
      odd: null,
      score: Math.min(82, 68 + lateFactor + Math.min(8, (awayGoals-homeGoals)*4)),
      condition: `${away} precisa terminar o tempo normal vencendo.`,
      why: [`${away} está vencendo por ${awayGoals}-${homeGoals}`, `Partida está aos ${minute}'`, 'Odd ao vivo disponível ao abrir os mercados'],
      risk: `${home} ainda pode empatar ou virar. Este é um sinal preliminar baseado em placar e minuto.`
    });
  }

  if (minute >= 50 && total === 0) {
    markets.push({
      type: 'Gols da partida',
      bet: 'Over 0.5 gols',
      odd: null,
      score: Math.min(76, 60 + Math.max(0, minute-50)),
      condition: 'Precisa sair pelo menos 1 gol até o fim da partida.',
      why: [`Placar está 0-0 aos ${minute}'`, 'Mercado ao vivo pode ser consultado no botão de mercados'],
      risk: 'O jogo pode terminar 0-0. Sem estatísticas detalhadas, este é apenas um sinal preliminar.'
    });
  } else if (minute >= 50 && total === 1) {
    markets.push({
      type: 'Gols da partida',
      bet: 'Over 1.5 gols',
      odd: null,
      score: Math.min(78, 62 + Math.max(0, minute-50)),
      condition: 'Precisa sair pelo menos mais 1 gol.',
      why: [`Já existe 1 gol no jogo`, `Partida está aos ${minute}'`],
      risk: 'O placar pode permanecer como está.'
    });
  } else if (minute >= 45 && total === 2) {
    markets.push({
      type: 'Gols da partida',
      bet: 'Over 2.5 gols',
      odd: null,
      score: Math.min(77, 61 + Math.max(0, minute-45)),
      condition: 'Precisa sair pelo menos mais 1 gol.',
      why: ['Já existem 2 gols no jogo', `Partida está aos ${minute}'`],
      risk: 'O jogo pode terminar com apenas 2 gols.'
    });
  }

  return markets;
}

function buildSignalsFromMatches(matches) {
  const list = [];
  matches.forEach(match => {
    (match.markets || []).forEach((market, index) => {
      list.push({
        id: `${match.id}-${index}`,
        matchId: match.id,
        home: match.home,
        away: match.away,
        league: match.league,
        minute: match.minute,
        score: match.score,
        status: match.status,
        shots: match.shots,
        onTarget: match.onTarget,
        corners: match.corners,
        cards: match.cards,
        pressure: match.pressure,
        marketType: market.type,
        bet: market.bet,
        odd: market.odd,
        rating: market.score,
        condition: market.condition,
        why: market.why,
        risk: market.risk
      });
    });
  });
  return list.sort((a,b)=>b.rating-a.rating);
}

function parseScore(score){
  const [home, away] = String(score || '0-0').split('-').map(v => parseInt(v.trim(),10));
  return { homeGoals: home || 0, awayGoals: away || 0, total: (home || 0) + (away || 0) };
}

function explainBet(signal){
  const score = parseScore(signal.score);
  const lower = String(signal.bet || '').toLowerCase();
  if (lower.includes('vence')) return `${signal.bet} significa que o time indicado precisa vencer a partida no tempo normal.`;
  if (lower.includes('dupla chance')) return `${signal.bet} cobre dois resultados possíveis.`;
  if (lower.includes('ambas marcam')) return 'Os dois times precisam marcar pelo menos 1 gol cada.';
  if (lower.includes('over 0.5')) return 'Precisa sair pelo menos 1 gol no total.';
  if (lower.includes('over 1.5')) return `Precisa haver pelo menos 2 gols no total. Atualmente há ${score.total}.`;
  if (lower.includes('over 2.5')) return `Precisa haver pelo menos 3 gols no total. Atualmente há ${score.total}.`;
  return signal.condition;
}

function badgeLabel(score){
  if(score >= 90) return 'Elite';
  if(score >= 80) return 'Forte';
  if(score >= 70) return 'Moderado';
  return 'Preliminar';
}

function signalCard(signal, compact = false, isDemo = false){
  return `
    <article class="signal-card">
      <div class="signal-top">
        <span class="status-badge">⚡ ${isDemo ? 'EXEMPLO DEMO' : 'SINAL GRIEL VALIDADO'}</span>
        <span class="small-live">${signal.minute}' • ${signal.score}</span>
      </div>
      <div class="signal-title">
        <h3>${signal.home} <span style="color:var(--muted)">×</span> ${signal.away}</h3>
        <small>${signal.league} • ${signal.status}</small>
      </div>
      <div class="what-bet">
        <span>O QUE APOSTAR</span>
        <strong>${signal.marketType}</strong>
        <b>${signal.bet}</b>
        <p>${explainBet(signal)}</p>
      </div>
      <div class="match-state">
        <div><span>Condição para vencer</span><b>${signal.condition}</b></div>
        <div><span>Minuto</span><b>${signal.minute}'</b></div>
        <div><span>Leitura</span><b>${isDemo ? 'Exemplo' : 'Validada'}</b></div>
      </div>
      <div class="metrics-grid">
        <div class="metric"><span>Odd atual</span><b>${formatOdd(signal.odd)}</b><small>${signal.odd ? (signal.bookmaker || 'Cotação ao vivo') : 'Sem odd disponível'}</small></div>
        <div class="metric"><span>Pontuação GRIEL</span><b>${signal.rating}/100</b><small>${badgeLabel(signal.rating)} • não é probabilidade</small></div>
        <div class="metric"><span>Placar</span><b>${signal.score}</b><small>${signal.home} × ${signal.away}</small></div>
        <div class="metric"><span>Finalizações</span><b>${signal.shots}</b><small>Dados reais</small></div>
        <div class="metric"><span>No alvo</span><b>${signal.onTarget}</b><small>Dados reais</small></div>
        <div class="metric"><span>Escanteios</span><b>${signal.corners}</b><small>Dados reais</small></div>
      </div>
      ${compact ? '' : `
      <div class="why-list">
        <strong>Por que esse sinal apareceu?</strong>
        ${(signal.why || []).map(item => `<p>✓ ${item}</p>`).join('')}
      </div>
      <div class="risk-box">
        <strong>O que pode dar errado</strong>
        <p>${signal.risk}</p>
      </div>
      <div class="decision-box">
        <strong>Leitura simples para o cliente</strong>
        <p>O mercado validado pelo motor é <b>${signal.bet}</b>, com base nos dados disponíveis no momento da análise. Confira a odd e a condição antes de decidir. Nenhum sinal garante resultado.</p>
      </div>`}
    </article>`;
}

function miniSignalCard(signal){
  return `
    <div class="mini-card">
      <strong>${signal.home} × ${signal.away}</strong>
      <small>${signal.marketType} • ${signal.bet}</small>
      <div class="market-chips">
        <div>${signal.minute}'</div>
        <div>Odd ${formatOdd(signal.odd)}</div>
        <div>${signal.rating}/100</div>
      </div>
    </div>`;
}

function liveMatchCard(match){
  const analyzed = appState.analysisCache.get(match.id);
  const analyzing = appState.analyzing.has(match.id);
  const signalCount = appState.signals.filter(s => s.matchId === match.id).length;
  const recent = (match.events || []).slice(-2).reverse();
  return `
    <article class="live-card live-card-pro">
      <div class="live-head">
        <div>
          <div class="live-league-line">${match.leagueLogo ? `<img src="${match.leagueLogo}" alt="">` : ''}<span>${match.league}</span>${match.round ? `<small> • ${match.round}</small>` : ''}</div>
        </div>
        <span class="status-badge">🔴 AO VIVO</span>
      </div>
      <div class="scoreboard-pro">
        <div class="team-pro home">
          ${match.homeLogo ? `<img src="${match.homeLogo}" alt="${match.home}">` : '<div class="team-fallback">G</div>'}
          <strong>${match.home}</strong>
        </div>
        <div class="score-pro">
          <b>${match.score.replace('-', ' - ')}</b>
          <span>${minuteLabel(match)}</span>
          <small>${match.status}</small>
        </div>
        <div class="team-pro away">
          ${match.awayLogo ? `<img src="${match.awayLogo}" alt="${match.away}">` : '<div class="team-fallback">G</div>'}
          <strong>${match.away}</strong>
        </div>
      </div>
      ${recent.length ? `<div class="recent-events">${recent.map(e=>eventMiniRow(e, match)).join('')}</div>` : '<div class="recent-events"><span>Nenhum evento detalhado recente retornado pelo provedor.</span></div>'}
      <div class="live-stats">
        <div><span>Finalizações</span><b>${match.shots}</b></div>
        <div><span>No alvo</span><b>${match.onTarget}</b></div>
        <div><span>Escanteios</span><b>${match.corners}</b></div>
        <div><span>Cartões</span><b>${match.cards}</b></div>
        <div><span>Posse</span><b>${match.possession}</b></div>
        <div><span>Análise</span><b>${signalCount ? `${signalCount} sinal(is)` : analyzed ? 'Sem sinal' : 'Pendente'}</b></div>
      </div>
      <div class="decision-box"><strong>Sincronização</strong><p>${freshnessText()} • placar e eventos atualizam automaticamente. Estatísticas detalhadas são atualizadas pelo provedor em ritmo próprio.</p></div>
      <div class="live-actions">
        <button class="primary open-center" data-id="${match.id}">Central da partida</button>
        <button class="secondary analyze-match" data-id="${match.id}" ${analyzing ? 'disabled' : ''}>${analyzing ? 'Analisando...' : 'Analisar sinal'}</button>
        <button class="secondary open-markets" data-id="${match.id}">Odds e mercados</button>
      </div>
    </article>`;
}

function eventIcon(event){
  const type = normalized(event?.type);
  const detail = normalized(event?.detail);
  if (/goal/.test(type) || /goal|penalty/.test(detail)) return '⚽';
  if (/card/.test(type) || /yellow|red/.test(detail)) return /red/.test(detail) ? '🟥' : '🟨';
  if (/subst/.test(type)) return '🔁';
  if (/var/.test(type)) return '📺';
  return '●';
}

function eventTitle(event){
  const detail = event?.detail || event?.type || 'Evento';
  const map = {
    'Normal Goal':'Gol', 'Penalty':'Gol de pênalti', 'Own Goal':'Gol contra', 'Missed Penalty':'Pênalti perdido',
    'Yellow Card':'Cartão amarelo', 'Red Card':'Cartão vermelho', 'Yellow-Red Card':'Segundo amarelo',
    'Substitution 1':'Substituição', 'Substitution 2':'Substituição', 'Substitution 3':'Substituição'
  };
  return map[detail] || detail;
}

function eventMinute(event){
  const base = safeNumber(event?.time?.elapsed, 0);
  const extra = safeNumber(event?.time?.extra, 0);
  return extra ? `${base}'+${extra}` : `${base}'`;
}

function eventMiniRow(event, match){
  const team = event?.team?.name || '';
  const player = event?.player?.name || '';
  return `<div class="event-mini"><span>${eventIcon(event)}</span><div><b>${eventTitle(event)} • ${eventMinute(event)}</b><small>${[team,player].filter(Boolean).join(' • ')}</small></div></div>`;
}

function catalogCard(item){
  return `<article class="catalog-card"><span class="eyebrow">MERCADO</span><h4>${item.name}</h4><p>${item.desc}</p><ul>${item.items.map(x=>`<li>${x}</li>`).join('')}</ul></article>`;
}

function academyCard(item){
  return `<article class="academy-card"><span class="eyebrow">GUIA RÁPIDO</span><h4>${item.title}</h4><p>${item.text}</p><div class="phrase-list" style="margin-top:12px"><div>${item.example}</div></div></article>`;
}

function setHeader(page){
  const titles = {
    dashboard: ['Painel Premium', 'Sinais explicados em linguagem simples, com conexão segura a dados esportivos.'],
    signals: ['Sinais completos', 'O cliente enxerga o mercado analisado, a condição e o risco.'],
    live: ['Jogos ao vivo', 'Partidas reais recebidas pelo backend seguro da GRIEL.'],
    markets: ['Mercados', 'Catálogo dos tipos de apostas que a plataforma pode exibir.'],
    academy: ['Academy', 'Explicações fáceis para quem está começando agora.'],
    history: ['Histórico', 'Mostre desempenho com transparência e organização.'],
    settings: ['Configurações', 'Ajustes do motor e status da integração GRIEL Live.']
  };
  $('#pageTitle').textContent = titles[page][0];
  $('#pageSubtitle').textContent = titles[page][1];
}

function goToPage(page){
  $$('.page').forEach(p=>p.classList.remove('active'));
  $('#' + page).classList.add('active');
  $$('.nav button').forEach(btn=>btn.classList.toggle('active', btn.dataset.page === page));
  setHeader(page);
  window.scrollTo({top:0, behavior:'smooth'});
}

function renderDashboard(){
  const hasLiveSignal = appState.connected && appState.signals.length > 0;
  const exampleSignals = buildSignalsFromMatches(structuredClone(demoMatches));

  if (hasLiveSignal) {
    const best = appState.signals[0];
    $('#featuredSignal').innerHTML = signalCard(best);
    $('#miniSignals').innerHTML = appState.signals.slice(1,4).map(miniSignalCard).join('') || '<div class="empty-state">Nenhum outro sinal validado agora.</div>';
    $('#heroSignalEyebrow').textContent = 'SINAL LIVE VALIDADO';
    $('#heroSignalLabel').textContent = `${best.home} × ${best.away}`;
    $('#heroSignalBet').textContent = best.bet;
    $('#heroSignalText').textContent = `Odd ${formatOdd(best.odd)} • ${best.rating}/100 • validado com estatísticas e mercado ao vivo disponíveis.`;
  } else if (appState.connected) {
    $('#featuredSignal').innerHTML = '<div class="empty-state"><b>GRIEL Live conectado.</b><br>Nenhum sinal validado ainda. Abra <b>Jogos ao vivo</b> e use <b>Analisar agora</b>. O GRIEL não inventa uma entrada quando faltam estatísticas ou odds.</div>';
    $('#miniSignals').innerHTML = '<div class="empty-state">Aguardando análises reais.</div>';
    $('#heroSignalEyebrow').textContent = 'MOTOR GRIEL LIVE';
    $('#heroSignalLabel').textContent = 'ANÁLISE REAL';
    $('#heroSignalBet').textContent = 'Nenhum sinal validado ainda';
    $('#heroSignalText').textContent = `${appState.matches.length} jogo(s) ao vivo conectados. Analise uma partida para cruzar estatísticas + odds.`;
  } else {
    $('#featuredSignal').innerHTML = signalCard(exampleSignals[0], false, true);
    $('#miniSignals').innerHTML = exampleSignals.slice(1,4).map(miniSignalCard).join('');
    $('#heroSignalEyebrow').textContent = 'EXEMPLO DEMONSTRATIVO';
    $('#heroSignalLabel').textContent = 'O QUE APOSTAR';
    $('#heroSignalBet').textContent = 'Barcelona vence';
    $('#heroSignalText').textContent = 'Exemplo visual exibido apenas quando o backend LIVE está indisponível.';
  }

  const currentSignals = hasLiveSignal ? appState.signals : [];
  const uniqueMarkets = [...new Set((currentSignals.length ? currentSignals : exampleSignals).map(s=>s.marketType))];
  $('#marketChips').innerHTML = uniqueMarkets.map(m=>`<div class="chip">${m}</div>`).join('');
  $('#statSignals').textContent = currentSignals.length;
  $('#statMatches').textContent = appState.connected ? appState.matches.length : 0;
  $('#statMarkets').textContent = [...new Set(currentSignals.map(s=>s.marketType))].length;
  $('#statAlerts').textContent = currentSignals.filter(s=>s.rating >= 80).length;
}

function populateFilters(){
  const marketSelect = $('#marketFilter');
  const leagueSelect = $('#leagueFilter');
  const marketTypes = [...new Set(appState.signals.map(s=>s.marketType))].sort();
  marketSelect.innerHTML = '<option value="">Todos os mercados</option>' + marketTypes.map(m=>`<option value="${m}">${m}</option>`).join('');
  const leagues = [...new Set(appState.matches.map(m=>m.league))].sort();
  leagueSelect.innerHTML = '<option value="">Todas as ligas</option>' + leagues.map(l=>`<option value="${l}">${l}</option>`).join('');
}

function renderSignals(){
  const q = ($('#searchSignals').value || '').toLowerCase().trim();
  const marketType = $('#marketFilter').value;
  const minScore = parseInt($('#scoreFilter').value,10) || 0;
  const filtered = appState.signals.filter(s => {
    const hay = `${s.home} ${s.away} ${s.league} ${s.marketType} ${s.bet}`.toLowerCase();
    return hay.includes(q) && (!marketType || s.marketType === marketType) && s.rating >= minScore;
  });
  $('#signalList').innerHTML = filtered.length
    ? filtered.map(signal => signalCard(signal)).join('')
    : `<div class="empty-state">${appState.connected ? 'Nenhum sinal ao vivo atende aos filtros neste momento.' : 'Backend ao vivo indisponível. O painel principal mantém apenas um exemplo demonstrativo.'}</div>`;
}

function renderLiveMatches(){
  const q = ($('#searchMatches').value || '').toLowerCase().trim();
  const league = $('#leagueFilter').value;
  const filtered = appState.matches.filter(match => {
    const hay = `${match.home} ${match.away} ${match.league}`.toLowerCase();
    return hay.includes(q) && (!league || match.league === league);
  });
  $('#liveMatches').innerHTML = filtered.length
    ? filtered.map(liveMatchCard).join('')
    : `<div class="empty-state">${appState.connected ? 'GRIEL Live conectado, mas não há partidas ao vivo retornadas pela API agora.' : 'Não foi possível carregar partidas reais.'}</div>`;
  $$('.open-center').forEach(btn => btn.addEventListener('click', () => openMatchCenter(parseInt(btn.dataset.id,10))));
  $$('.open-markets').forEach(btn => btn.addEventListener('click', () => openMarketModal(parseInt(btn.dataset.id,10))));
  $$('.analyze-match').forEach(btn => btn.addEventListener('click', () => analyzeMatch(parseInt(btn.dataset.id,10))));
}

function renderMarketsPage(){ $('#marketCatalog').innerHTML = marketCatalog.map(catalogCard).join(''); }
function renderAcademy(){ $('#academyCards').innerHTML = academyContent.map(academyCard).join(''); $('#phraseList').innerHTML = phraseLibrary.map(line => `<div>${line}</div>`).join(''); calculateReturn(); }
function renderHistory(){
  $('#historyRows').innerHTML = historyRowsData.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td class="${row[5] === 'GREEN' ? 'tag-green' : 'tag-red'}">${row[5]}</td></tr>`).join('');
}

function statValue(stats, type){
  const item = (stats || []).find(s => String(s.type || '').toLowerCase() === type.toLowerCase());
  return item ? item.value : null;
}

function parseStatsResponse(response){
  if (!Array.isArray(response) || !response.length) return null;
  const sides = response.map(team => ({ team: team.team?.name || 'Time', stats: team.statistics || [] }));
  return {
    sides,
    rows: [
      ['Finalizações', 'Total Shots'],
      ['No alvo', 'Shots on Goal'],
      ['Escanteios', 'Corner Kicks'],
      ['Posse', 'Ball Possession'],
      ['Amarelos', 'Yellow Cards'],
      ['Vermelhos', 'Red Cards']
    ].map(([label,type]) => ({ label, values: sides.map(s => statValue(s.stats, type) ?? '—') }))
  };
}

function flattenOdds(response){
  const out = [];
  const fixtures = Array.isArray(response) ? response : [];
  for (const item of fixtures) {
    const bookmakers = item.bookmakers || [];
    for (const bookmaker of bookmakers) {
      for (const bet of (bookmaker.bets || [])) {
        for (const value of (bet.values || [])) {
          const odd = value.odd ?? value.price ?? value.value_odd;
          out.push({
            bookmaker: bookmaker.name || 'Bookmaker',
            market: bet.name || `Mercado ${bet.id ?? ''}`,
            choice: value.value || value.name || value.label || 'Opção',
            odd: odd,
            handicap: value.handicap ?? null,
            main: value.main ?? null,
            suspended: Boolean(value.suspended)
          });
        }
      }
    }
  }
  return out.filter(x => !x.suspended).slice(0, 160);
}


function numericValue(value){
  if (value === null || value === undefined || value === '—') return 0;
  const n = parseFloat(String(value).replace('%','').replace(',','.'));
  return Number.isFinite(n) ? n : 0;
}

function statForSide(side, type){
  return numericValue(statValue(side?.stats || [], type));
}

function snapshotFromStats(parsed){
  if (!parsed || !parsed.sides || parsed.sides.length < 2) return null;
  const toSide = side => ({
    team: side.team,
    shots: statForSide(side, 'Total Shots'),
    onTarget: statForSide(side, 'Shots on Goal'),
    corners: statForSide(side, 'Corner Kicks'),
    possession: statForSide(side, 'Ball Possession'),
    yellow: statForSide(side, 'Yellow Cards'),
    red: statForSide(side, 'Red Cards')
  });
  return { home: toSide(parsed.sides[0]), away: toSide(parsed.sides[1]) };
}

function oddNumber(value){
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalized(value){
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

function lineFromOdd(row){
  const direct = Number(row.handicap);
  if (Number.isFinite(direct)) return direct;
  const text = `${row.choice || ''} ${row.market || ''}`.replace(',','.');
  const match = text.match(/(?:over|under|mais de|menos de)\s*([0-9]+(?:\.[0-9]+)?)/i) || text.match(/([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : null;
}

function getOddSettings(){
  const saved = JSON.parse(localStorage.getItem('grielSettings') || '{}');
  return {
    minOdd: Number(saved.minOdd || $('#minOdd')?.value || 1.01),
    maxOdd: Number(saved.maxOdd || $('#maxOdd')?.value || 20),
    minScore: Number(saved.minScore || $('#minScore')?.value || 72)
  };
}

function usableOdd(row){
  const n = oddNumber(row.odd);
  const {minOdd,maxOdd} = getOddSettings();
  return n !== null && n >= minOdd && n <= maxOdd && !row.suspended;
}

function bestOdd(odds, predicate){
  return (odds || []).filter(o => usableOdd(o) && predicate(o)).sort((a,b)=>Number(b.odd)-Number(a.odd))[0] || null;
}

function winnerChoiceMatches(row, team, side){
  const choice = normalized(row.choice);
  const teamName = normalized(team);
  return choice === teamName || choice.includes(teamName) || choice === side || choice === (side === 'home' ? '1' : '2') || choice === (side === 'home' ? 'casa' : 'fora');
}

function marketLooksLikeWinner(row){
  const m = normalized(row.market);
  return /winner|1x2|match result|full time result|resultado|moneyline/.test(m);
}

function marketLooksLikeTotals(row){
  const m = normalized(row.market);
  return /over.?under|total.*goal|goals.*total|total goals|gols/.test(m) && !/team|home|away|time da/.test(m);
}

function marketLooksLikeBtts(row){
  const m = normalized(row.market);
  return /both teams.*score|btts|ambas.*marcam/.test(m);
}

function marketLooksLikeCorners(row){
  const m = normalized(row.market);
  return /corner|escanteio/.test(m) && /total|over.?under|corner/.test(m);
}

function marketLooksLikeCards(row){
  const m = normalized(row.market);
  return /card|cartao/.test(m) && /total|over.?under|card/.test(m);
}

function isOverChoice(row){
  return /over|mais de/.test(normalized(row.choice));
}

function isYesChoice(row){
  return /yes|sim/.test(normalized(row.choice));
}

function makeSignal(match, market, meta){
  return {
    id: `${match.id}-${normalized(meta.bet).replace(/[^a-z0-9]+/g,'-')}`,
    matchId: match.id,
    home: match.home,
    away: match.away,
    league: match.league,
    minute: match.minute,
    score: match.score,
    status: match.status,
    shots: meta.shots,
    onTarget: meta.onTarget,
    corners: meta.corners,
    cards: meta.cards,
    pressure: meta.pressure,
    marketType: meta.marketType,
    bet: meta.bet,
    odd: oddNumber(market.odd),
    bookmaker: market.bookmaker || 'Bookmaker',
    rating: Math.max(0, Math.min(95, Math.round(meta.rating))),
    condition: meta.condition,
    why: meta.why,
    risk: meta.risk,
    validatedAt: new Date().toISOString(),
    sourceVerified: true
  };
}

function generateValidatedSignals(match, parsedStats, odds){
  const snap = snapshotFromStats(parsedStats);
  if (!snap || !odds?.length) return [];

  const result = [];
  const score = parseScore(match.score);
  const totalShots = snap.home.shots + snap.away.shots;
  const totalTarget = snap.home.onTarget + snap.away.onTarget;
  const totalCorners = snap.home.corners + snap.away.corners;
  const totalCards = snap.home.yellow + snap.away.yellow + snap.home.red + snap.away.red;
  const targetDiff = snap.home.onTarget - snap.away.onTarget;
  const shotsDiff = snap.home.shots - snap.away.shots;
  const possessionDiff = snap.home.possession - snap.away.possession;
  const activity = totalShots >= 16 || totalTarget >= 6;
  const pressure = totalTarget >= 9 || totalShots >= 24 ? 'Alta' : totalTarget >= 5 || totalShots >= 16 ? 'Média/Alta' : 'Moderada';
  const common = {
    shots: `${snap.home.shots}-${snap.away.shots}`,
    onTarget: `${snap.home.onTarget}-${snap.away.onTarget}`,
    corners: `${snap.home.corners}-${snap.away.corners}`,
    cards: `${snap.home.yellow + snap.home.red}-${snap.away.yellow + snap.away.red}`,
    pressure
  };

  // Resultado do jogo: só libera quando o líder também mostra vantagem mínima nos dados.
  if (match.minute >= 60 && match.minute <= 89 && score.homeGoals !== score.awayGoals) {
    const homeLeading = score.homeGoals > score.awayGoals;
    const leader = homeLeading ? match.home : match.away;
    const side = homeLeading ? 'home' : 'away';
    const goalDiff = Math.abs(score.homeGoals - score.awayGoals);
    const statAdv = homeLeading ? (targetDiff >= 1 || shotsDiff >= 4 || possessionDiff >= 7) : (targetDiff <= -1 || shotsDiff <= -4 || possessionDiff <= -7);
    const market = bestOdd(odds, o => marketLooksLikeWinner(o) && winnerChoiceMatches(o, leader, side));
    if (market && statAdv) {
      const advTarget = homeLeading ? targetDiff : -targetDiff;
      const advShots = homeLeading ? shotsDiff : -shotsDiff;
      const rating = 70 + goalDiff*5 + Math.max(0,advTarget)*2 + Math.min(5,Math.max(0,advShots)/2) + (match.minute >= 75 ? 3 : 0);
      result.push(makeSignal(match, market, {
        ...common,
        marketType:'Resultado do jogo',
        bet:`${leader} vence`,
        rating,
        condition:`${leader} precisa terminar o tempo normal vencendo.`,
        why:[`${leader} lidera o placar por ${goalDiff} gol(s)`, `Finalizações ${common.shots}`, `Chutes no alvo ${common.onTarget}`, `Odd live ${formatOdd(market.odd)} disponível em ${market.bookmaker}`],
        risk:'Mesmo liderando e com vantagem nos dados, o adversário ainda pode empatar ou virar.'
      }));
    }
  }

  // Próxima linha de gols: exige mercado real e volume ofensivo suficiente.
  if (match.minute >= 40 && match.minute <= 84 && activity) {
    const targetLine = score.total + 0.5;
    const market = bestOdd(odds, o => marketLooksLikeTotals(o) && isOverChoice(o) && Math.abs((lineFromOdd(o) ?? -99) - targetLine) < 0.11);
    if (market) {
      let timeAdj = match.minute <= 65 ? 6 : match.minute <= 75 ? 2 : match.minute <= 80 ? -2 : -7;
      const rating = 66 + Math.min(12,totalTarget*1.5) + Math.min(8,totalShots/4) + timeAdj;
      result.push(makeSignal(match, market, {
        ...common,
        marketType:'Gols da partida',
        bet:`Over ${targetLine.toFixed(1)} gols`,
        rating,
        condition:`O jogo precisa terminar com pelo menos ${Math.floor(targetLine)+1} gols no total.`,
        why:[`${totalShots} finalizações no jogo`, `${totalTarget} chutes no alvo`, `Placar atual ${match.score}`, `Mercado live encontrado com odd ${formatOdd(market.odd)}`],
        risk:`Ainda precisa sair pelo menos 1 gol. Aos ${match.minute}', o tempo restante é um fator de risco.`
      }));
    }
  }

  // Ambas marcam: só quando um lado ainda precisa marcar e tem produção ofensiva real.
  if (match.minute >= 40 && match.minute <= 78 && ((score.homeGoals > 0 && score.awayGoals === 0) || (score.awayGoals > 0 && score.homeGoals === 0))) {
    const missing = score.homeGoals === 0 ? snap.home : snap.away;
    const missingName = score.homeGoals === 0 ? match.home : match.away;
    const market = bestOdd(odds, o => marketLooksLikeBtts(o) && isYesChoice(o));
    if (market && missing.shots >= 6 && missing.onTarget >= 2) {
      const rating = 68 + Math.min(12, missing.onTarget*3) + Math.min(7, missing.shots/2) - (match.minute > 70 ? 4 : 0);
      result.push(makeSignal(match, market, {
        ...common,
        marketType:'Ambas marcam',
        bet:'Ambas marcam — SIM',
        rating,
        condition:`${missingName} ainda precisa marcar pelo menos 1 gol.`,
        why:[`${missingName} tem ${missing.shots} finalizações`, `${missingName} tem ${missing.onTarget} chutes no alvo`, `Odd live ${formatOdd(market.odd)} disponível`],
        risk:`${missingName} pode continuar criando sem converter as chances.`
      }));
    }
  }

  // Escanteios: procura a menor linha Over ainda não atingida e próxima do total atual.
  if (match.minute >= 35 && match.minute <= 84 && totalCorners >= 5) {
    const candidates = odds.filter(o => usableOdd(o) && marketLooksLikeCorners(o) && isOverChoice(o)).map(o => ({o,line:lineFromOdd(o)})).filter(x => Number.isFinite(x.line) && x.line > totalCorners && x.line <= totalCorners + 2.5).sort((a,b)=>a.line-b.line || Number(b.o.odd)-Number(a.o.odd));
    const picked = candidates[0];
    if (picked) {
      const need = Math.floor(picked.line) + 1 - totalCorners;
      const pace = totalCorners / Math.max(match.minute,1) * 90;
      const rating = 67 + Math.min(14,totalCorners) + (pace >= picked.line+1 ? 6 : 0) - Math.max(0,need-1)*5;
      result.push(makeSignal(match, picked.o, {
        ...common,
        marketType:'Escanteios',
        bet:`Over ${picked.line.toFixed(1)} escanteios`,
        rating,
        condition:`A partida precisa terminar com pelo menos ${Math.floor(picked.line)+1} escanteios.`,
        why:[`Já ocorreram ${totalCorners} escanteios`, `Ritmo projetado de aproximadamente ${pace.toFixed(1)} escanteios em 90 minutos`, `Odd live ${formatOdd(picked.o.odd)} disponível`],
        risk:`Ainda faltam ${need} escanteio(s); o ritmo da partida pode cair.`
      }));
    }
  }

  // Cartões: mesma lógica de linha próxima, quando o mercado existir.
  if (match.minute >= 35 && match.minute <= 84 && totalCards >= 2) {
    const candidates = odds.filter(o => usableOdd(o) && marketLooksLikeCards(o) && isOverChoice(o)).map(o => ({o,line:lineFromOdd(o)})).filter(x => Number.isFinite(x.line) && x.line > totalCards && x.line <= totalCards + 2).sort((a,b)=>a.line-b.line || Number(b.o.odd)-Number(a.o.odd));
    const picked = candidates[0];
    if (picked) {
      const need = Math.floor(picked.line) + 1 - totalCards;
      const rating = 64 + Math.min(12,totalCards*2) - Math.max(0,need-1)*4;
      result.push(makeSignal(match, picked.o, {
        ...common,
        marketType:'Cartões',
        bet:`Over ${picked.line.toFixed(1)} cartões`,
        rating,
        condition:`A partida precisa terminar com pelo menos ${Math.floor(picked.line)+1} cartões.`,
        why:[`Já ocorreram ${totalCards} cartões contabilizados`, `Mercado live disponível com odd ${formatOdd(picked.o.odd)}`],
        risk:`A intensidade disciplinar pode diminuir e a linha não ser atingida.`
      }));
    }
  }

  const {minScore} = getOddSettings();
  return result.filter(s => s.rating >= minScore).sort((a,b)=>b.rating-a.rating).slice(0,5);
}

function applyStatsToMatch(match, parsedStats){
  const snap = snapshotFromStats(parsedStats);
  if (!snap) return;
  match.shots = `${snap.home.shots}-${snap.away.shots}`;
  match.onTarget = `${snap.home.onTarget}-${snap.away.onTarget}`;
  match.corners = `${snap.home.corners}-${snap.away.corners}`;
  match.cards = `${snap.home.yellow + snap.home.red}-${snap.away.yellow + snap.away.red}`;
  match.possession = `${snap.home.possession || 0}%-${snap.away.possession || 0}%`;
  const totalTarget = snap.home.onTarget + snap.away.onTarget;
  const totalShots = snap.home.shots + snap.away.shots;
  match.pressure = totalTarget >= 9 || totalShots >= 24 ? 'Alta' : totalTarget >= 5 || totalShots >= 16 ? 'Média/Alta' : 'Moderada';
}

async function fetchRealAnalysis(matchId){
  const cached = appState.analysisCache.get(matchId);
  if (cached && Date.now() - cached.at < 15000) return cached;

  const [oddsResp, statsResp] = await Promise.all([
    fetch(`${LIVE_ENDPOINT}?action=odds&fixture=${matchId}&v=${Math.floor(Date.now()/15000)}`, {cache:'no-store'}),
    fetch(`${LIVE_ENDPOINT}?action=stats&fixture=${matchId}&v=${Math.floor(Date.now()/60000)}`, {cache:'no-store'})
  ]);
  const [oddsData, statsData] = await Promise.all([oddsResp.json(), statsResp.json()]);
  if (!oddsResp.ok && !statsResp.ok) throw new Error(oddsData.detail || statsData.detail || 'Falha ao consultar odds e estatísticas.');

  const bundle = {
    at: Date.now(),
    odds: oddsData.ok ? flattenOdds(oddsData.response) : [],
    stats: statsData.ok ? parseStatsResponse(statsData.response) : null,
    oddsQuota: oddsData.quota || null,
    statsQuota: statsData.quota || null
  };
  appState.analysisCache.set(matchId, bundle);
  return bundle;
}

async function analyzeMatch(matchId){
  const match = appState.matches.find(m => m.id === matchId);
  if (!match || appState.analyzing.has(matchId)) return;
  appState.analyzing.add(matchId);
  renderLiveMatches();
  toast(`Analisando ${match.home} × ${match.away} com dados reais...`);
  try {
    const bundle = await fetchRealAnalysis(matchId);
    applyStatsToMatch(match, bundle.stats);
    const validated = generateValidatedSignals(match, bundle.stats, bundle.odds);
    appState.signals = appState.signals.filter(s => s.matchId !== matchId).concat(validated).sort((a,b)=>b.rating-a.rating);
    renderAll();
    if (validated.length) {
      goToPage('signals');
      toast(`${validated.length} sinal(is) validado(s). Melhor: ${validated[0].bet}`);
    } else {
      toast('Nenhum sinal validado: faltam condições, estatísticas ou odd compatível.');
    }
  } catch (error) {
    toast(`Análise indisponível: ${error.message}`);
  } finally {
    appState.analyzing.delete(matchId);
    renderLiveMatches();
  }
}


function detailStat(response, type){
  if (!Array.isArray(response)) return ['—','—'];
  return response.slice(0,2).map(side => statValue(side.statistics || [], type) ?? '—');
}

function renderStatBar(label, values){
  const a = numericValue(values[0]);
  const b = numericValue(values[1]);
  const sum = a + b || 1;
  const ap = Math.max(5, Math.round((a/sum)*100));
  const bp = Math.max(5, 100-ap);
  return `<div class="center-stat"><div class="center-stat-values"><b>${values[0]}</b><span>${label}</span><b>${values[1]}</b></div><div class="dual-bar"><i style="width:${ap}%"></i><i style="width:${bp}%"></i></div></div>`;
}

function eventMarkerClass(event, match){
  const isHome = event?.team?.id && event.team.id === match.homeId;
  const type = normalized(event?.type);
  if (/goal/.test(type)) return isHome ? 'home goal' : 'away goal';
  if (/card/.test(type)) return isHome ? 'home card' : 'away card';
  if (/subst/.test(type)) return isHome ? 'home subst' : 'away subst';
  return isHome ? 'home' : 'away';
}

function pitchEventPosition(event, match, index){
  const isHome = event?.team?.id && event.team.id === match.homeId;
  const type = normalized(event?.type);
  let x = isHome ? 28 : 72;
  let y = 25 + ((index * 19) % 50);
  if (/goal/.test(type)) x = isHome ? 84 : 16;
  if (/subst/.test(type)) y = 8;
  if (/card/.test(type)) x = isHome ? 38 : 62;
  return {x,y};
}

function renderPitch(events, match){
  const selected = (events || []).slice(-8);
  const markers = selected.map((event, i)=>{
    const pos = pitchEventPosition(event, match, i);
    return `<button class="pitch-marker ${eventMarkerClass(event, match)}" style="left:${pos.x}%;top:${pos.y}%" title="${eventTitle(event)} ${eventMinute(event)}">${eventIcon(event)}<span>${eventMinute(event)}</span></button>`;
  }).join('');
  const last = selected[selected.length-1];
  return `<div class="pitch-wrap">
    <div class="pitch-caption"><span>MAPA DE EVENTOS</span><small>Posição visual ilustrativa; a API atual não fornece coordenadas de campo.</small></div>
    <div class="football-pitch"><div class="half-line"></div><div class="center-circle"></div><div class="box left"></div><div class="box right"></div>${markers}</div>
    ${last ? `<div class="last-event-banner"><span>${eventIcon(last)}</span><div><b>${eventTitle(last)} • ${eventMinute(last)}</b><small>${[last.team?.name,last.player?.name,last.assist?.name].filter(Boolean).join(' • ')}</small></div></div>` : '<div class="last-event-banner"><div><b>Aguardando eventos oficiais</b><small>Gols, cartões e substituições aparecem quando o provedor os disponibiliza.</small></div></div>'}
  </div>`;
}

function renderLineups(lineups){
  if (!Array.isArray(lineups) || !lineups.length) return '<div class="empty-state">Escalações não disponíveis para esta competição.</div>';
  return `<div class="lineup-grid">${lineups.slice(0,2).map(l=>`<div class="lineup-team"><div class="lineup-head">${l.team?.logo ? `<img src="${l.team.logo}" alt="">` : ''}<div><b>${l.team?.name || 'Time'}</b><small>Formação ${l.formation || '—'}</small></div></div><ol>${(l.startXI || []).map(p=>`<li><span>${p.player?.number || '•'}</span>${p.player?.name || 'Jogador'} <small>${p.player?.pos || ''}</small></li>`).join('')}</ol></div>`).join('')}</div>`;
}

function renderMatchCenter(match, detail){
  const fixture = detail?.fixture || {};
  const events = Array.isArray(detail?.events) ? detail.events : (match.events || []);
  const stats = Array.isArray(detail?.statistics) ? detail.statistics : [];
  const lineups = Array.isArray(detail?.lineups) ? detail.lineups : [];
  const goals = detail?.goals || parseScore(match.score);
  const scoreText = detail?.goals ? `${goals.home ?? 0} - ${goals.away ?? 0}` : match.score.replace('-', ' - ');
  const elapsed = fixture.status?.elapsed ?? match.minute;
  const extra = fixture.status?.extra ?? match.extra;
  const minuteText = extra ? `${elapsed}'+${extra}` : `${elapsed}'`;
  const home = detail?.teams?.home || {name:match.home,logo:match.homeLogo};
  const away = detail?.teams?.away || {name:match.away,logo:match.awayLogo};
  const timeline = [...events].sort((a,b)=>(safeNumber(b.time?.elapsed)-safeNumber(a.time?.elapsed))).slice(0,18);
  const statRows = [
    ['Finalizações', detailStat(stats,'Total Shots')], ['No alvo', detailStat(stats,'Shots on Goal')],
    ['Escanteios', detailStat(stats,'Corner Kicks')], ['Posse', detailStat(stats,'Ball Possession')],
    ['Faltas', detailStat(stats,'Fouls')], ['Amarelos', detailStat(stats,'Yellow Cards')]
  ];
  return `<div class="center-scoreboard">
      <div class="center-team">${home.logo ? `<img src="${home.logo}" alt="">` : ''}<b>${home.name}</b></div>
      <div class="center-score"><strong>${scoreText}</strong><span>${minuteText}</span><small>${translateStatus(fixture.status?.long || match.status)}${match.venue ? ` • ${match.venue}` : ''}</small></div>
      <div class="center-team">${away.logo ? `<img src="${away.logo}" alt="">` : ''}<b>${away.name}</b></div>
    </div>
    <div class="center-grid">
      <section>${renderPitch(events, match)}</section>
      <section class="center-timeline"><div class="center-section-title"><b>Linha do tempo</b><span>atualização ~15s</span></div>${timeline.length ? timeline.map(e=>`<div class="timeline-row"><span class="timeline-minute">${eventMinute(e)}</span><span class="timeline-icon">${eventIcon(e)}</span><div><b>${eventTitle(e)}</b><small>${[e.team?.name,e.player?.name,e.assist?.name ? `Assist.: ${e.assist.name}` : ''].filter(Boolean).join(' • ')}</small></div></div>`).join('') : '<div class="empty-state">Nenhum evento oficial retornado ainda.</div>'}</section>
    </div>
    <div class="center-panels">
      <section class="center-stats-panel"><div class="center-section-title"><b>Estatísticas ao vivo</b><span>atualização ~60s</span></div>${stats.length ? statRows.map(([l,v])=>renderStatBar(l,v)).join('') : '<div class="empty-state">Estatísticas indisponíveis para esta liga/jogo.</div>'}</section>
      <section><div class="center-section-title"><b>Escalações</b><span>${lineups.length ? 'dados do provedor' : 'indisponível'}</span></div>${renderLineups(lineups)}</section>
    </div>
    <div class="center-disclaimer">A GRIEL mostra apenas eventos oficialmente recebidos pela API atual. Lances como cobrança de falta, ataque perigoso e posição exata da bola exigem um feed de incidentes/trackeamento com coordenadas, que este provedor não fornece.</div>`;
}

async function openMatchCenter(matchId){
  const match = appState.matches.find(m=>m.id===matchId);
  if (!match) return;
  $('#centerTitle').textContent = `${match.home} × ${match.away}`;
  $('#centerBody').innerHTML = '<div class="empty-state">Carregando central ao vivo...</div>';
  $('#matchCenterModal').showModal();
  try {
    const cached = appState.matchCenterCache.get(matchId);
    let detail;
    if (cached && Date.now() - cached.at < 15000) {
      detail = cached.detail;
    } else {
      const resp = await fetch(`${LIVE_ENDPOINT}?action=matchcenter&fixture=${matchId}&v=${Math.floor(Date.now()/15000)}`, {cache:'no-store'});
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.detail || data.error || 'Falha ao carregar central.');
      detail = Array.isArray(data.response) ? data.response[0] : null;
      appState.matchCenterCache.set(matchId,{at:Date.now(),detail});
    }
    $('#centerBody').innerHTML = detail ? renderMatchCenter(match, detail) : '<div class="empty-state">O provedor não retornou detalhes desta partida.</div>';
  } catch (error) {
    $('#centerBody').innerHTML = `<div class="empty-state">Não foi possível carregar a central agora.<br>${error.message}</div>`;
  }
}

async function openMarketModal(matchId){
  const match = appState.matches.find(item => item.id === matchId);
  if(!match) return;
  $('#modalTitle').textContent = `${match.home} × ${match.away}`;
  $('#modalBody').innerHTML = '<div class="empty-state">Carregando odds e estatísticas reais deste jogo...</div>';
  $('#marketModal').showModal();

  try {
    const [oddsResp, statsResp] = await Promise.all([
      fetch(`${LIVE_ENDPOINT}?action=odds&fixture=${matchId}&v=${Math.floor(Date.now()/15000)}`, {cache:'no-store'}),
      fetch(`${LIVE_ENDPOINT}?action=stats&fixture=${matchId}&v=${Math.floor(Date.now()/60000)}`, {cache:'no-store'})
    ]);
    const [oddsData, statsData] = await Promise.all([oddsResp.json(), statsResp.json()]);
    if (!oddsResp.ok && !statsResp.ok) throw new Error(oddsData.detail || statsData.detail || 'Falha nas consultas.');

    const odds = oddsData.ok ? flattenOdds(oddsData.response) : [];
    const stats = statsData.ok ? parseStatsResponse(statsData.response) : null;

    const statsHtml = stats ? `
      <article class="market-row">
        <h4>Estatísticas ao vivo</h4>
        <div class="row-grid"><div><span>Time</span><b>${stats.sides[0]?.team || 'Casa'}</b></div><div><span>Placar</span><b>${match.score}</b></div><div><span>Time</span><b>${stats.sides[1]?.team || 'Fora'}</b></div></div>
        <div class="phrase-list" style="margin-top:12px">${stats.rows.map(r=>`<div><b>${r.label}:</b> ${r.values[0]} × ${r.values[1]}</div>`).join('')}</div>
      </article>` : '<div class="integration-note">Estatísticas detalhadas indisponíveis para esta partida.</div>';

    const oddsHtml = odds.length ? odds.map(o => `
      <article class="market-row">
        <h4>${o.market}</h4>
        <p><b>Opção:</b> ${o.choice}${o.handicap !== null ? ` • Linha ${o.handicap}` : ''}</p>
        <div class="row-grid"><div><span>Bookmaker</span><b>${o.bookmaker}</b></div><div><span>Odd ao vivo</span><b>${formatOdd(o.odd)}</b></div><div><span>Status</span><b>Disponível</b></div></div>
      </article>`).join('') : '<div class="integration-note">A API não retornou odds live para esta partida neste momento. Isso varia por competição e bookmaker.</div>';

    $('#modalBody').innerHTML = statsHtml + oddsHtml;
  } catch (error) {
    $('#modalBody').innerHTML = `<div class="empty-state">Não foi possível carregar os detalhes agora.<br>${error.message}</div>`;
  }
}

function openTopOpportunity(matchId){ return analyzeMatch(matchId); }

function calculateReturn(){
  const stake = parseFloat($('#stakeInput').value || '0');
  const odd = parseFloat($('#oddInput').value || '0');
  $('#calcOutput').textContent = (stake * odd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function loadSettings(){
  const saved = JSON.parse(localStorage.getItem('grielSettings') || '{}');
  $('#minScore').value = saved.minScore || 72;
  $('#minScoreOut').textContent = $('#minScore').value;
  $('#minOdd').value = saved.minOdd || 1.45;
  $('#maxOdd').value = saved.maxOdd || 2.80;
  $('#onlyLive').checked = saved.onlyLive !== undefined ? saved.onlyLive : true;
}

function saveSettings(){
  const settings = {
    minScore: parseInt($('#minScore').value,10),
    minOdd: parseFloat($('#minOdd').value),
    maxOdd: parseFloat($('#maxOdd').value),
    onlyLive: $('#onlyLive').checked
  };
  localStorage.setItem('grielSettings', JSON.stringify(settings));
  toast('Configurações salvas neste navegador.');
}

async function testBackend(){
  const response = await fetch(`${LIVE_ENDPOINT}?action=health`, { cache: 'no-store' });
  const data = await response.json();
  if (!response.ok || !data.ok) throw new Error(data.error || 'Backend indisponível.');
  return data;
}

async function loadLiveData({showToast = false, background = false} = {}){
  if (!background) {
    appState.mode = 'loading';
    updateModeUi();
  }
  if (showToast) toast('Consultando GRIEL Live...');

  try {
    if (!background) {
      const health = await testBackend();
      if (!health.configured) throw new Error('A variável API_FOOTBALL_KEY ainda não está disponível para a Function.');
    }

    const bucket = Math.floor(Date.now() / LIVE_REFRESH_MS);
    const response = await fetch(`${LIVE_ENDPOINT}?action=live&v=${bucket}`, { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.detail || data.error || 'Falha ao consultar jogos ao vivo.');

    appState.connected = true;
    appState.mode = 'live';
    appState.liveError = '';
    appState.lastUpdated = data.updatedAt || new Date().toISOString();
    appState.quota = data.quota || null;
    appState.matches = (data.response || []).map(fixtureToMatch).filter(m => m.id);
    appState.matches.forEach(m => {
      const cached = appState.analysisCache.get(m.id);
      if (cached?.stats) applyStatsToMatch(m, cached.stats);
    });
    const liveIds = new Set(appState.matches.map(m => m.id));
    appState.signals = appState.signals.filter(s => liveIds.has(s.matchId)).map(s => {
      const m = appState.matches.find(x => x.id === s.matchId);
      return m ? {...s, minute:m.minute, score:m.score, status:m.status} : s;
    }).sort((a,b)=>b.rating-a.rating);
    $('#apiStatus').innerHTML = `<b>GRIEL Live conectado.</b><br>${appState.matches.length} jogo(s) ao vivo • ${freshnessText()}${appState.quota?.dailyRemaining ? ` • ${appState.quota.dailyRemaining} requisições restantes hoje` : ''}.`;
  } catch (error) {
    appState.liveError = error.message;
    if (background && appState.connected) {
      $('#apiStatus').innerHTML = `<b>GRIEL Live conectado com dados anteriores.</b><br>Última atualização válida: ${freshnessText()} • nova tentativa automática em 15s.`;
      return;
    }
    appState.connected = false;
    appState.mode = 'demo';
    appState.matches = [];
    appState.signals = [];
    $('#apiStatus').innerHTML = `<b>GRIEL Live ainda não conectado.</b><br>${error.message}`;
  }

  updateModeUi();
  renderAll();
}

function scheduleLiveRefresh(){
  clearInterval(appState.refreshTimer);
  appState.refreshTimer = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    loadLiveData({background:true});
  }, LIVE_REFRESH_MS);
}

function updateModeUi(){
  const pill = $('#modePill');
  if (appState.mode === 'live') {
    pill.textContent = 'LIVE';
    $('#engineModeLabel').textContent = 'Dados reais conectados';
    $('#engineLabel').textContent = 'Motor GRIEL Live';
  } else if (appState.mode === 'loading') {
    pill.textContent = 'CONECTANDO';
    $('#engineModeLabel').textContent = 'Verificando API';
    $('#engineLabel').textContent = 'Motor GRIEL';
  } else {
    pill.textContent = 'DEMO';
    $('#engineModeLabel').textContent = 'Exemplo visual';
    $('#engineLabel').textContent = 'Motor GRIEL';
  }
}

function exportCsv(){
  const rows = [['Data','Jogo','O que apostar','Odd','Pontos','Status'], ...historyRowsData];
  const csv = rows.map(row => row.join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'griel-historico.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function toast(message){
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2800);
}

function renderAll(){
  populateFilters();
  renderDashboard();
  renderSignals();
  renderLiveMatches();
  renderMarketsPage();
  renderAcademy();
  renderHistory();
}

function bindEvents(){
  $$('.nav button').forEach(btn => btn.addEventListener('click', () => goToPage(btn.dataset.page)));
  $$('[data-go]').forEach(btn => btn.addEventListener('click', () => goToPage(btn.dataset.go)));
  $('#searchSignals').addEventListener('input', renderSignals);
  $('#marketFilter').addEventListener('change', renderSignals);
  $('#scoreFilter').addEventListener('change', renderSignals);
  $('#searchMatches').addEventListener('input', renderLiveMatches);
  $('#leagueFilter').addEventListener('change', renderLiveMatches);
  $('#stakeInput').addEventListener('input', calculateReturn);
  $('#oddInput').addEventListener('input', calculateReturn);
  $('#minScore').addEventListener('input', (e) => $('#minScoreOut').textContent = e.target.value);
  $('#saveSettings').addEventListener('click', saveSettings);
  $('#exportCsv').addEventListener('click', exportCsv);
  $('#testApiBtn').addEventListener('click', async () => {
    $('#apiStatus').textContent = 'Testando GRIEL Live...';
    await loadLiveData({showToast:true});
  });
  $('#refreshData').addEventListener('click', () => loadLiveData({showToast:true}));
  $('#showAlertDemo').addEventListener('click', () => toast(appState.connected ? 'Alertas GRIEL prontos para futura integração push/Telegram.' : 'Alertas em modo demonstração.'));
  $('#closeModal').addEventListener('click', () => $('#marketModal').close());
  $('#closeCenter').addEventListener('click', () => $('#matchCenterModal').close());
  $('#matchCenterModal').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickedOutside = e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right;
    if(clickedOutside) e.currentTarget.close();
  });
  $('#marketModal').addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickedOutside = e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right;
    if(clickedOutside) e.currentTarget.close();
  });
}

async function init(){
  loadSettings();
  bindEvents();
  appState.mode = 'loading';
  updateModeUi();
  renderAll();
  await loadLiveData();
  scheduleLiveRefresh();
}

init();
