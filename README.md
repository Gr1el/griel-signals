# GRIEL Signals v10 — FreshSync Live

Versão de correção de produção focada em eliminar respostas antigas presas no cache e manter o feed ao vivo dentro da janela esperada do provedor.

## Mudanças principais

- chave de cache rotativa por janela de 15 s para `live` e `matchcenter`;
- cache compartilhado do CDN continua reduzindo consumo quando há vários clientes;
- bypass automático de cache quando uma resposta chega com mais de 35 s;
- `live` e `matchcenter` usam TTL de 12 s no CDN;
- odds usam janela própria e TTL de 20 s;
- navegador continua em `no-store`;
- status visual permanece `LIVE` apenas enquanto a sincronização está fresca;
- API key continua somente na Netlify Function.

## Limite real

A API-Football atualiza fixtures/eventos ao vivo em ciclos aproximados de 15 segundos. Portanto, o objetivo desta versão é near-real-time consistente, sem fingir precisão de segundos que a fonte não fornece.

Para operação comercial contínua, o plano Free de 100 chamadas/dia é insuficiente.
