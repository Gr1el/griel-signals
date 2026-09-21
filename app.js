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
  refreshTimer: null
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
  const homeGoals = safeNumber(goals.home, 0);
  const awayGoals = safeNumber(goals.away, 0);
  return {
    id: fixture.id,
    home: teams.home?.name || 'Mandante',
    away: teams.away?.name || 'Visitante',
    homeLogo: teams.home?.logo || '',
    awayLogo: teams.away?.logo || '',
    league: [league.country, league.name].filter(Boolean).join(' • ') || 'Competição',
    minute,
    score: `${homeGoals}-${awayGoals}`,
    status: translateStatus(status.long || status.short || 'Ao vivo'),
    statusShort: status.short || '',
    shots: 'sob demanda',
    onTarget: 'sob demanda',
    corners: 'sob demanda',
    cards: 'sob demanda',
    possession: 'sob demanda',
    pressure: 'Em análise',
    markets: buildPreliminaryMarkets({
      home: teams.home?.name || 'Mandante',
      away: teams.away?.name || 'Visitante',
      minute,
      homeGoals,
      awayGoals
    })
  };
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
        <span class="status-badge">⚡ ${isDemo ? 'EXEMPLO DEMO' : 'SINAL GRIEL'}</span>
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
        <div><span>Leitura</span><b>${isDemo ? 'Exemplo' : 'Preliminar'}</b></div>
      </div>
      <div class="metrics-grid">
        <div class="metric"><span>Odd atual</span><b>${formatOdd(signal.odd)}</b><small>${signal.odd ? 'Cotação disponível' : 'Abra mercados do jogo'}</small></div>
        <div class="metric"><span>Pontuação GRIEL</span><b>${signal.rating}/100</b><small>${badgeLabel(signal.rating)} • não é probabilidade</small></div>
        <div class="metric"><span>Placar</span><b>${signal.score}</b><small>${signal.home} × ${signal.away}</small></div>
        <div class="metric"><span>Finalizações</span><b>${signal.shots}</b><small>Consultar detalhes</small></div>
        <div class="metric"><span>No alvo</span><b>${signal.onTarget}</b><small>Consultar detalhes</small></div>
        <div class="metric"><span>Escanteios</span><b>${signal.corners}</b><small>Consultar detalhes</small></div>
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
        <p>A entrada analisada é <b>${signal.bet}</b>. Confira a odd ao vivo e a condição antes de decidir. Nenhum sinal garante resultado.</p>
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
  return `
    <article class="live-card">
      <div class="live-head">
        <div>
          <h3>${match.home} × ${match.away}</h3>
          <small>${match.league}</small>
        </div>
        <span class="status-badge">🔴 AO VIVO</span>
      </div>
      <div class="live-score">
        <div><span class="eyebrow">MINUTO</span><b>${match.minute || 0}'</b></div>
        <div><span class="eyebrow">PLACAR</span><b>${match.score}</b></div>
        <div><span class="eyebrow">STATUS</span><b>${match.status}</b></div>
      </div>
      <div class="live-stats">
        <div><span>Finalizações</span><b>${match.shots}</b></div>
        <div><span>No alvo</span><b>${match.onTarget}</b></div>
        <div><span>Escanteios</span><b>${match.corners}</b></div>
        <div><span>Cartões</span><b>${match.cards}</b></div>
        <div><span>Posse</span><b>${match.possession}</b></div>
        <div><span>Pressão</span><b>${match.pressure}</b></div>
      </div>
      <div class="decision-box"><strong>Sincronização</strong><p>${freshnessText()} • atualização automática a cada 15s enquanto a aba estiver aberta.</p></div>
      <div class="live-actions">
        <button class="primary open-markets" data-id="${match.id}">Ver odds e mercados</button>
        <button class="secondary open-top-signal" data-id="${match.id}">Ver sinal GRIEL</button>
      </div>
    </article>`;
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
    $('#featuredSignal').innerHTML = signalCard(appState.signals[0]);
    $('#miniSignals').innerHTML = appState.signals.slice(1,4).map(miniSignalCard).join('') || '<div class="empty-state">Nenhum outro sinal ao vivo agora.</div>';
  } else if (appState.connected) {
    $('#featuredSignal').innerHTML = '<div class="empty-state"><b>GRIEL Live conectado.</b><br>Nenhum sinal preliminar disponível neste momento. Isso pode acontecer mesmo com jogos ao vivo.</div>';
    $('#miniSignals').innerHTML = '<div class="empty-state">Aguardando novas condições de sinal.</div>';
  } else {
    $('#featuredSignal').innerHTML = signalCard(exampleSignals[0], false, true);
    $('#miniSignals').innerHTML = exampleSignals.slice(1,4).map(miniSignalCard).join('');
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
  $$('.open-markets').forEach(btn => btn.addEventListener('click', () => openMarketModal(parseInt(btn.dataset.id,10))));
  $$('.open-top-signal').forEach(btn => btn.addEventListener('click', () => openTopOpportunity(parseInt(btn.dataset.id,10))));
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
  return out.filter(x => !x.suspended).slice(0, 36);
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

function openTopOpportunity(matchId){
  const related = appState.signals.filter(s => s.matchId === matchId).sort((a,b)=>b.rating-a.rating);
  if(!related.length) { toast('Este jogo ainda não atingiu uma regra preliminar da GRIEL.'); return; }
  goToPage('signals');
  toast(`Sinal atual: ${related[0].bet}`);
}

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
    appState.signals = buildSignalsFromMatches(appState.matches);
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
