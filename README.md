# GRIEL Signals v9 — Ultimate Live

Versão consolidada da plataforma GRIEL Signals para acompanhamento de partidas ao vivo, Match Center, odds e análise de sinais com dados reais.

## O que a v9 faz

- usa somente dados reais em produção; não inventa partidas para preencher a tela;
- lista todos os jogos ao vivo retornados por `fixtures?live=all`;
- atualiza o feed principal em ciclo de 15 segundos;
- ao abrir a Central da Partida, pausa o polling geral e atualiza apenas a partida selecionada, reduzindo uso da API;
- usa `fixtures?id=FIXTURE_ID` para obter em uma única chamada:
  - placar/status;
  - eventos;
  - estatísticas;
  - escalações;
  - estatísticas de jogadores;
- consulta `odds/live` apenas quando Odds ou GRIEL são abertos;
- adapta a frequência das odds ao limite por minuto informado pela API;
- carrega Prediction + H2H somente sob demanda;
- exibe quota diária e por minuto;
- mantém a API Key somente na Netlify Function;
- não gera sinal se estatísticas e mercado/odd real não forem suficientes;
- registra sinais localmente no navegador e permite exportar CSV;
- possui fallback visual para logos indisponíveis;
- possui alertas opcionais do navegador;
- inclui interface responsiva para desktop e celular.

## Arquivos

```text
index.html
style.css
app.js
config.js
netlify.toml
README.md
netlify/
  functions/
    griel-live.js
```

## Variável obrigatória na Netlify

Crie a variável secreta:

```text
API_FOOTBALL_KEY
```

A chave não deve aparecer em `app.js`, `config.js`, GitHub ou HTML.

## Backend

O redirect `/api/griel` aponta para a Netlify Function `griel-live`.

Ações disponíveis:

```text
/api/griel?action=health
/api/griel?action=live
/api/griel?action=matchcenter&fixture=FIXTURE_ID
/api/griel?action=odds&fixture=FIXTURE_ID
/api/griel?action=context&fixture=FIXTURE_ID&home=HOME_ID&away=AWAY_ID
```

## Estratégia de atualização

- feed geral: 15 s;
- Central da Partida: 15 s;
- odds: 30 s no limite de plano Free; 15 s quando o limite por minuto detectado for maior;
- contexto Prediction/H2H: somente por ação do usuário;
- o feed geral fica pausado enquanto a Central da Partida está aberta, evitando duas rotinas live simultâneas.

Isso foi feito para reduzir atraso sem disparar requisições desnecessárias.

## Match Center

A Central da Partida possui abas para:

- Visão geral;
- Estatísticas;
- Linha do tempo;
- Escalações;
- Jogadores;
- Odds live;
- GRIEL Engine;
- Contexto.

O campo visual representa os eventos recebidos pela API. Como a API-FOOTBALL não fornece coordenadas físicas de tracking para cada lance, a posição dos marcadores no campo é editorial e não deve ser apresentada como localização exata da bola.

## GRIEL Engine

O motor só cria sinais quando encontra dados suficientes e uma odd live real dentro dos filtros configurados. Ele pode avaliar:

- Resultado do jogo;
- Dupla chance;
- Over de gols;
- Ambas marcam;
- Over de escanteios;
- Over de cartões.

O `GRIEL Score` é uma pontuação interna de força da leitura e não representa garantia ou probabilidade certificada de lucro.

## Publicação

O projeto pode ser publicado diretamente pela Netlify a partir do repositório GitHub. Não há comando de build.

Configuração:

```text
Branch: main
Base directory: vazio
Build command: vazio
Publish directory: .
Functions directory: netlify/functions
```

## Segurança

Se uma API Key tiver aparecido em print, chat, GitHub ou qualquer página pública, regenere a chave no painel API-FOOTBALL e substitua o valor de `API_FOOTBALL_KEY` na Netlify.

## Uso comercial

Antes de comercializar a plataforma, revise termos de uso do provedor de dados/odds, regras locais aplicáveis, política de privacidade, jogo responsável, autenticação dos clientes e controle de assinaturas. A marca visual GRIEL no código não substitui registro formal de marca/direitos.
