# GRIEL Signals v7 — Match Center Live

Versão focada em uma experiência de partida ao vivo mais completa e visual.

## Novidades da v7

- placar com escudos dos times
- minuto + acréscimos (`90'+6` quando o provedor enviar o extra)
- central da partida em modal
- linha do tempo de eventos oficiais
- gols, cartões, substituições e VAR quando o provedor disponibilizar
- mapa visual do campo com marcadores de eventos
- estatísticas ao vivo com barras comparativas
- escalações e formação quando disponíveis
- odds e mercados continuam em tela separada
- motor de sinais validado continua cruzando estatísticas + odds
- atualização do placar/eventos em ciclo de ~15 segundos
- API Key continua somente na Netlify Function

## Limite importante do provedor atual

A API-FOOTBALL fornece placar, eventos, estatísticas, escalações e odds, mas os eventos documentados se concentram em gols, cartões e substituições. Ela não fornece coordenadas reais da bola/jogador para desenhar com fidelidade onde ocorreu cada falta, ataque ou chute.

Por isso o campo da GRIEL v7 é identificado como **posição visual ilustrativa**. Ele nunca deve ser apresentado como rastreamento real de posição.

Para reproduzir exatamente um painel de tracking com lances como “cobrança de falta aos 88'” em uma posição exata do campo, seria necessário contratar um feed esportivo mais granular que forneça incidentes/live tracking e coordenadas.

## Backend

A Netlify Function usa a variável secreta:

`API_FOOTBALL_KEY`

Endpoints internos:

- `/api/griel?action=health`
- `/api/griel?action=live`
- `/api/griel?action=matchcenter&fixture=ID`
- `/api/griel?action=stats&fixture=ID`
- `/api/griel?action=odds&fixture=ID`
- `/api/griel?action=prediction&fixture=ID`

## Publicação

Mantenha a estrutura:

- `index.html`
- `style.css`
- `app.js`
- `config.js`
- `netlify.toml`
- `netlify/functions/griel-live.js`
