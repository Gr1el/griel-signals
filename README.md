# GRIEL Signals v4 Live

Versão com frontend premium + backend seguro em Netlify Functions para consultar a API-FOOTBALL sem expor a API Key no navegador ou no GitHub.

## Arquivos principais

- `index.html`
- `style.css`
- `app.js`
- `config.js`
- `netlify.toml`
- `netlify/functions/griel-live.js`

## Variável de ambiente

Na Netlify, crie a variável secreta:

`API_FOOTBALL_KEY`

A Function lê a chave com `process.env.API_FOOTBALL_KEY`.

## Endpoints internos do GRIEL

- `/api/griel?action=health`
- `/api/griel?action=live`
- `/api/griel?action=odds&fixture=ID`
- `/api/griel?action=stats&fixture=ID`
- `/api/griel?action=prediction&fixture=ID`

## Economia de quota

O plano grátis da API-FOOTBALL possui cota limitada. Por isso:

- a lista geral de jogos ao vivo é armazenada no cache CDN da Netlify por até 30 minutos;
- odds e estatísticas são buscadas sob demanda e armazenadas por até 10 minutos;
- a chave nunca é enviada ao navegador.

Para atualização realmente próxima dos 15 segundos oferecidos pela API, será necessário usar uma cota de requisições maior e reduzir os tempos de cache.

## Importante

A pontuação GRIEL exibida pelo frontend é uma pontuação heurística interna e não representa probabilidade garantida de acerto. Nenhum sinal garante resultado ou lucro.
