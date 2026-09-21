# GRIEL Signals — Versão Premium v3

Protótipo avançado da plataforma GRIEL Signals, com foco em apresentação comercial e experiência intuitiva para usuários iniciantes.

## O que esta versão entrega

- Interface premium com identidade visual GRIEL
- Painel principal com sinal em destaque
- Tela de sinais com filtros
- Tela de jogos ao vivo
- Modal de mercados por jogo
- Catálogo de mercados
- Academy para iniciantes
- Histórico e exportação CSV
- Configurações salvas no navegador
- Preparação para usar dados reais por API

## Arquivos

- `index.html`
- `style.css`
- `app.js`
- `config.js`
- `README.md`

## Como usar

1. Abra `index.html` no navegador.
2. O sistema inicia em modo demonstração.
3. Para tentar dados reais, vá em **Configurações** e preencha:
   - API Base URL
   - API Key (se necessário)
   - marque **Tentar usar dados reais ao carregar**
4. O frontend tentará buscar:
   - `GET /matches`
   - `GET /signals`

## Estrutura esperada para integração real

### `/matches`
Retornar um array com campos no formato:

```json
[
  {
    "id": 1,
    "home": "Barcelona",
    "away": "Roma",
    "league": "Champions Cup • Internacional",
    "minute": 67,
    "score": "2-1",
    "status": "2º tempo",
    "shots": "18-9",
    "onTarget": "9-4",
    "corners": "7-3",
    "cards": "1-2",
    "possession": "61%-39%",
    "pressure": "Alta",
    "markets": []
  }
]
```

### `/signals`
Retornar um array já pronto para renderização no formato:

```json
[
  {
    "id": "1-0",
    "matchId": 1,
    "home": "Barcelona",
    "away": "Roma",
    "league": "Champions Cup • Internacional",
    "minute": 67,
    "score": "2-1",
    "status": "2º tempo",
    "shots": "18-9",
    "onTarget": "9-4",
    "corners": "7-3",
    "cards": "1-2",
    "pressure": "Alta",
    "marketType": "Resultado do jogo",
    "bet": "Barcelona vence",
    "odd": 1.62,
    "rating": 91,
    "condition": "O Barcelona precisa vencer no tempo normal.",
    "why": ["Barcelona lidera o placar"],
    "risk": "A Roma ainda pode empatar ou virar."
  }
]
```

## Observação importante

Esta versão é um frontend avançado. Para produção comercial real, ainda é recomendado criar:

- backend seguro
- autenticação e painel administrativo
- banco de dados
- controle de usuários e assinaturas
- integrações com provedores de dados/odds
- notificações push, email ou Telegram
- termos de uso, privacidade e jogo responsável

## Marca

A interface usa a identidade GRIEL Signals. Isso ajuda na apresentação comercial, mas proteção formal da marca depende de registro e validação jurídica adequados.
