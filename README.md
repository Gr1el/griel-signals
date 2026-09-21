# GRIEL Signals v5 — Live Near-Real-Time

Versão otimizada do GRIEL Signals para reduzir atraso em partidas ao vivo.

## Principais mudanças

- lista de jogos ao vivo: cache de 15 segundos
- odds ao vivo: cache de 15 segundos
- estatísticas: cache de 60 segundos
- predictions: cache de 30 minutos
- atualização automática do frontend a cada 15 segundos quando a aba está visível
- mantém o último dado válido se houver uma falha temporária
- exibe idade da sincronização e quota restante quando disponível
- traduz alguns status comuns para português
- API key permanece somente na variável `API_FOOTBALL_KEY` da Netlify

## Importante sobre produção

O plano gratuito da API-FOOTBALL tem 100 requisições por dia. Ele serve para desenvolvimento, mas não para uma plataforma comercial que atualiza partidas a cada poucos segundos.

A arquitetura desta versão usa cache compartilhado na Netlify para evitar uma chamada ao provedor por cliente, mas um produto comercial deve usar um plano com quota suficiente e monitorar os limites retornados pela API.

## Deploy

Substitua os arquivos atuais do repositório pelos desta pasta, preservando:

`netlify/functions/griel-live.js`

A variável secreta na Netlify continua com o nome:

`API_FOOTBALL_KEY`

Não coloque a chave no código ou no GitHub.
