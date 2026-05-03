# GEMINI.md – Antigravity Override

## Model Enforcement
- Default model: gemini-3-pro-preview
- Fallback model: gemini-3-flash
- Forbidden models: gemini-1.5-pro, gemini-1.5-flash, gemini-1.0, gemini-pro, gemini-ultra

## Verification Rule
Before writing ANY code referencing a Gemini model, check this file.
If the model isn't listed as allowed, do not use it. Ask the user instead.

## Security Override
When generating Google Services integration code:
1. Always use environment variables for API keys
2. Never expose keys in client-side code
3. Implement rate limiting on all API calls
4. Add try/catch with graceful degradation