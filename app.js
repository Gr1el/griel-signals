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
const appState = {
  matches: structuredClone(demoMatches),
  signals: [],
  mode: (window.GRIEL_CONFIG && window.GRIEL_CONFIG.mode) || 'demo'
};

function buildSignalsFromMatches(matches) {
  const list = [];
  matches.forEach(match => {
    match.markets.forEach((market, index) => {
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
  const [home, away] = score.split('-').map(v => parseInt(v.trim(),10));
  return { homeGoals: home || 0, awayGoals: away || 0, total: (home || 0) + (away || 0) };
}

function explainBet(signal){
  const score = parseScore(signal.score);
  const lower = signal.bet.toLowerCase();
  if (lower.includes('vence')) return `${signal.bet} significa que o time indicado precisa vencer a partida no tempo normal.`;
  if (lower.includes('dupla chance')) return `${signal.bet} significa que 2 resultados cobertos atendem ao mercado.`;
  if (lower.includes('empate')) return `${signal.bet} depende do resultado final conforme o nome do mercado.`;
  if (lower.includes('ambas marcam')) return `Os dois times precisam marcar pelo menos 1 gol cada.`;
  if (lower.includes('over 0.5')) return `Precisa sair pelo menos 1 gol no total.`;
  if (lower.includes('over 1.5')) return `Precisa sair pelo menos 2 gols no total. Atualmente há ${score.total}.`;
  if (lower.includes('over 2.5')) return `Precisa sair pelo menos 3 gols no total. Atualmente há ${score.total}.`;
  if (lower.includes('over 8.5 escanteios')) return `A partida precisa ter pelo menos 9 escanteios. Atualmente há ${sumStat(signal.corners)}.`;
  if (lower.includes('over 9.5 escanteios')) return `A partida precisa ter pelo menos 10 escanteios. Atualmente há ${sumStat(signal.corners)}.`;
  if (lower.includes('over 10.5 escanteios')) return `A partida precisa ter pelo menos 11 escanteios. Atualmente há ${sumStat(signal.corners)}.`;
  if (lower.includes('mais de 1.5 gols')) return `O time indicado precisa marcar 2 ou mais gols.`;
  return signal.condition;
}

function sumStat(stat){
  return (stat || '0-0').split('-').reduce((sum, part) => sum + (parseInt(part.trim(),10) || 0), 0);
}

function badgeLabel(score){
  if(score >= 90) return 'Elite';
  if(score >= 80) return 'Forte';
  if(score >= 70) return 'Moderado';
  return 'Atenção';
}

function signalCard(signal, compact = false){
  return `
    <article class="signal-card">
      <div class="signal-top">
        <span class="status-badge">⚡ SINAL DETECTADO</span>
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
        <div><span>Pressão</span><b>${signal.pressure}</b></div>
      </div>
      <div class="metrics-grid">
        <div class="metric"><span>Odd atual</span><b>${signal.odd.toFixed(2)}</b><small>Retorno decimal</small></div>
        <div class="metric"><span>Pontuação GRIEL</span><b>${signal.rating}/100</b><small>${badgeLabel(signal.rating)} • não é garantia</small></div>
        <div class="metric"><span>Placar</span><b>${signal.score}</b><small>${signal.home} × ${signal.away}</small></div>
        <div class="metric"><span>Finalizações</span><b>${signal.shots}</b><small>Total do jogo</small></div>
        <div class="metric"><span>No alvo</span><b>${signal.onTarget}</b><small>Total do jogo</small></div>
        <div class="metric"><span>Escanteios</span><b>${signal.corners}</b><small>Total do jogo</small></div>
      </div>
      ${compact ? '' : `
      <div class="why-list">
        <strong>Por que esse sinal apareceu?</strong>
        ${signal.why.map(item => `<p>✓ ${item}</p>`).join('')}
      </div>
      <div class="risk-box">
        <strong>O que pode dar errado</strong>
        <p>${signal.risk}</p>
      </div>
      <div class="decision-box">
        <strong>Leitura simples para o cliente</strong>
        <p>Se você seguir este mercado, a entrada indicada é <b>${signal.bet}</b>. Leia a condição e a odd antes de decidir.</p>
      </div>`}
    </article>
  `;
}

function miniSignalCard(signal){
  return `
    <div class="mini-card">
      <strong>${signal.home} × ${signal.away}</strong>
      <small>${signal.marketType} • ${signal.bet}</small>
      <div class="market-chips">
        <div>${signal.minute}'</div>
        <div>Odd ${signal.odd.toFixed(2)}</div>
        <div>${signal.rating}/100</div>
      </div>
    </div>
  `;
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
        <div>
          <span class="eyebrow">MINUTO</span>
          <b>${match.minute}'</b>
        </div>
        <div>
          <span class="eyebrow">PLACAR</span>
          <b>${match.score}</b>
        </div>
        <div>
          <span class="eyebrow">STATUS</span>
          <b>${match.status}</b>
        </div>
      </div>
      <div class="live-stats">
        <div><span>Finalizações</span><b>${match.shots}</b></div>
        <div><span>No alvo</span><b>${match.onTarget}</b></div>
        <div><span>Escanteios</span><b>${match.corners}</b></div>
        <div><span>Cartões</span><b>${match.cards}</b></div>
        <div><span>Posse</span><b>${match.possession}</b></div>
        <div><span>Pressão</span><b>${match.pressure}</b></div>
      </div>
      <div class="live-actions">
        <button class="primary open-markets" data-id="${match.id}">Ver mercados do jogo</button>
        <button class="secondary open-top-signal" data-id="${match.id}">Ver melhor oportunidade</button>
      </div>
    </article>
  `;
}

function catalogCard(item){
  return `
    <article class="catalog-card">
      <span class="eyebrow">MERCADO</span>
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
      <ul>${item.items.map(x=>`<li>${x}</li>`).join('')}</ul>
    </article>
  `;
}

function academyCard(item){
  return `
    <article class="academy-card">
      <span class="eyebrow">GUIA RÁPIDO</span>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
      <div class="phrase-list" style="margin-top:12px">
        <div>${item.example}</div>
      </div>
    </article>
  `;
}

function setHeader(page){
  const titles = {
    dashboard: ['Painel Premium', 'Tudo explicado de forma simples para você vender a experiência GRIEL.'],
    signals: ['Sinais completos', 'Aqui o cliente enxerga claramente o que apostar e por quê.'],
    live: ['Jogos ao vivo', 'Partidas monitoradas com acesso rápido aos mercados do jogo.'],
    markets: ['Mercados', 'Catálogo dos tipos de apostas que a plataforma pode exibir.'],
    academy: ['Academy', 'Explicações fáceis para quem está começando agora.'],
    history: ['Histórico', 'Mostre desempenho com transparência e organização.'],
    settings: ['Configurações', 'Ajustes do motor, filtros e integração com dados reais.']
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
  $('#featuredSignal').innerHTML = signalCard(appState.signals[0]);
  $('#miniSignals').innerHTML = appState.signals.slice(1,4).map(miniSignalCard).join('');
  const uniqueMarkets = [...new Set(appState.signals.map(s=>s.marketType))];
  $('#marketChips').innerHTML = uniqueMarkets.map(m=>`<div class="chip">${m}</div>`).join('');
  $('#statSignals').textContent = appState.signals.length;
  $('#statMatches').textContent = appState.matches.length;
  $('#statMarkets').textContent = uniqueMarkets.length;
  $('#statAlerts').textContent = appState.signals.filter(s=>s.rating >= 80).length;
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
    : '<div class="empty-state">Nenhum sinal encontrado com esses filtros.</div>';
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
    : '<div class="empty-state">Nenhuma partida encontrada com esses filtros.</div>';

  $$('.open-markets').forEach(btn => btn.addEventListener('click', () => openMarketModal(parseInt(btn.dataset.id,10))));
  $$('.open-top-signal').forEach(btn => btn.addEventListener('click', () => openTopOpportunity(parseInt(btn.dataset.id,10))));
}

function renderMarketsPage(){
  $('#marketCatalog').innerHTML = marketCatalog.map(catalogCard).join('');
}

function renderAcademy(){
  $('#academyCards').innerHTML = academyContent.map(academyCard).join('');
  $('#phraseList').innerHTML = phraseLibrary.map(line => `<div>${line}</div>`).join('');
  calculateReturn();
}

function renderHistory(){
  $('#historyRows').innerHTML = historyRowsData.map(row => `
    <tr>
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td class="${row[5] === 'GREEN' ? 'tag-green' : 'tag-red'}">${row[5]}</td>
    </tr>
  `).join('');
}

function openMarketModal(matchId){
  const match = appState.matches.find(item => item.id === matchId);
  if(!match) return;
  $('#modalTitle').textContent = `${match.home} × ${match.away}`;
  $('#modalBody').innerHTML = match.markets.map(market => `
    <article class="market-row">
      <h4>${market.bet}</h4>
      <p>${market.condition}</p>
      <div class="row-grid">
        <div><span>Tipo</span><b>${market.type}</b></div>
        <div><span>Odd</span><b>${market.odd.toFixed(2)}</b></div>
        <div><span>Pontuação GRIEL</span><b>${market.score}/100</b></div>
      </div>
      <div class="phrase-list" style="margin-top:12px">
        <div><b>O que apostar:</b> ${market.bet}</div>
        <div><b>Por que apareceu:</b> ${market.why.join(' • ')}</div>
        <div><b>Risco:</b> ${market.risk}</div>
      </div>
    </article>
  `).join('');
  $('#marketModal').showModal();
}

function openTopOpportunity(matchId){
  const related = appState.signals.filter(s => s.matchId === matchId).sort((a,b)=>b.rating-a.rating);
  if(!related.length) return;
  goToPage('signals');
  setTimeout(() => {
    const firstCard = $('#signalList .signal-card');
    if(firstCard) firstCard.scrollIntoView({behavior:'smooth', block:'start'});
  }, 120);
  toast(`Melhor oportunidade: ${related[0].bet}`);
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
  $('#apiUrl').value = saved.apiUrl || (window.GRIEL_CONFIG && window.GRIEL_CONFIG.apiBaseUrl) || '';
  $('#apiKey').value = saved.apiKey || '';
  $('#liveModeToggle').checked = saved.liveMode === 'live';
}

function saveSettings(){
  const settings = {
    minScore: parseInt($('#minScore').value,10),
    minOdd: parseFloat($('#minOdd').value),
    maxOdd: parseFloat($('#maxOdd').value),
    onlyLive: $('#onlyLive').checked,
    apiUrl: $('#apiUrl').value.trim(),
    apiKey: $('#apiKey').value.trim(),
    liveMode: $('#liveModeToggle').checked ? 'live' : 'demo'
  };
  localStorage.setItem('grielSettings', JSON.stringify(settings));
  toast('Configurações salvas neste navegador.');
}

async function tryLiveMode(){
  const saved = JSON.parse(localStorage.getItem('grielSettings') || '{}');
  const wantsLive = saved.liveMode === 'live';
  appState.mode = wantsLive ? 'live' : 'demo';
  updateModeUi();

  if(!wantsLive || !saved.apiUrl) {
    appState.matches = structuredClone(demoMatches);
    appState.signals = buildSignalsFromMatches(appState.matches);
    renderAll();
    return;
  }

  try {
    const url = saved.apiUrl.replace(/\/$/, '');
    const headers = saved.apiKey ? { 'Authorization': `Bearer ${saved.apiKey}` } : {};

    const [matchesResp, signalsResp] = await Promise.all([
      fetch(`${url}/matches`, { headers }),
      fetch(`${url}/signals`, { headers })
    ]);

    if(!matchesResp.ok || !signalsResp.ok) throw new Error('Falha na resposta da API');
    const liveMatches = await matchesResp.json();
    const liveSignals = await signalsResp.json();

    if(!Array.isArray(liveMatches) || !Array.isArray(liveSignals)) throw new Error('Formato inválido');

    appState.matches = liveMatches;
    appState.signals = liveSignals;
    renderAll();
    $('#apiStatus').textContent = 'Conectado com sucesso usando dados reais.';
  } catch (error) {
    appState.mode = 'demo';
    updateModeUi();
    appState.matches = structuredClone(demoMatches);
    appState.signals = buildSignalsFromMatches(appState.matches);
    renderAll();
    $('#apiStatus').textContent = `Falha ao carregar dados reais. Mantido em demonstração. Motivo: ${error.message}`;
  }
}

function updateModeUi(){
  const demo = appState.mode !== 'live';
  $('#modePill').textContent = demo ? 'DEMO' : 'LIVE';
  $('#engineModeLabel').textContent = demo ? 'Modo demonstração' : 'Tentando dados reais';
  $('#engineLabel').textContent = demo ? 'Motor GRIEL ativo' : 'Motor GRIEL ao vivo';
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
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
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
    $('#apiStatus').textContent = 'Testando integração...';
    saveSettings();
    await tryLiveMode();
  });
  $('#refreshData').addEventListener('click', async () => {
    toast('Atualizando dados...');
    await tryLiveMode();
  });
  $('#showAlertDemo').addEventListener('click', () => toast('Notificações demonstrativas ativas.'));
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
  appState.signals = buildSignalsFromMatches(appState.matches);
  updateModeUi();
  renderAll();
  await tryLiveMode();
}

init();
