# TikTok Recipe Bot

Workflow de n8n que recibe un link de TikTok por Telegram y devuelve la receta estructurada con macros, ingredientes y pasos.

## Infraestructura

- n8n corre en Docker: `cd n8n && docker-compose up -d` → disponible en `http://localhost:5678`
- Para que Telegram pueda enviar webhooks, se necesita una URL pública HTTPS → usar ngrok: `ngrok http 5678`
- Actualizar `WEBHOOK_URL` en `n8n/.env` con la URL de ngrok y reiniciar: `docker-compose restart`

## Variables de entorno (`n8n/.env`)

```
N8N_ENCRYPTION_KEY=<generada una sola vez>
N8N_PORT=5678
WEBHOOK_URL=https://<ngrok-url>
SUPADATA_API_KEY=<token de supadata.ai>
ANTHROPIC_API_KEY=<token de Anthropic>
```

El archivo `.env` **no está en git**. Las claves se referencian en los nodos como `$env.SUPADATA_API_KEY` y `$env.ANTHROPIC_API_KEY`.

## Importar el workflow

1. Abrir `http://localhost:5678`
2. Ir a **Workflows → Import from file**
3. Seleccionar `docs/n8n/tiktok-recipe-bot.json`
4. Configurar las credenciales de Telegram con el token del BotFather
5. Activar el workflow

## Flujo de nodos

```
Telegram Trigger
  └─ ¿Es TikTok? (IF: mensaje contiene "tiktok.com")
       ├─ [sí] → Procesando (respuesta inmediata "⏳ Analizando...")
       │           └─ Supadata: Transcribir (GET transcript del video)
       │               └─ Armar request Claude (Code: construye body para Anthropic API)
       │                   └─ Claude: Extraer Receta (POST /v1/messages)
       │                       └─ Formatear Receta (Code: parsea JSON y arma MarkdownV2)
       │                           └─ Enviar Receta (Telegram)
       └─ [no] → Pedir URL (respuesta "Mandame un link de TikTok")
```

## APIs

### Supadata (transcripción)

- **Endpoint:** `GET https://api.supadata.ai/v1/tiktok/transcript?url=<tiktok_url>`
- **Header:** `x-api-key: $env.SUPADATA_API_KEY`
- **Respuesta:** `{ text: "..." }` o `{ content: [{ text, offset, duration }] }`
- **Free tier** disponible en supadata.ai

### Anthropic Claude (extracción de receta)

- **Endpoint:** `POST https://api.anthropic.com/v1/messages`
- **Headers:** `x-api-key`, `anthropic-version: 2023-06-01`, `content-type: application/json`
- **Modelo:** `claude-haiku-4-5-20251001`
- **Output:** JSON con campos `name`, `type` (breakfast/lunch), `kcal`, `protein`, `carbs`, `fat`, `tags`, `ingredients`, `steps`

## Receta extraída — shape

El JSON que devuelve Claude coincide con el modelo de receta de la app (ver `docs/data.md`):

```json
{
  "name": "Nombre de la receta",
  "type": "breakfast",
  "kcal": 450,
  "protein": 35,
  "carbs": 40,
  "fat": 12,
  "tags": ["rápido", "sin TACC"],
  "ingredients": [{ "name": "Atún", "amount": "1 lata" }],
  "steps": ["Paso 1", "Paso 2"]
}
```

Esto permite importar recetas extraídas del bot directamente al catálogo de la app en el futuro.
