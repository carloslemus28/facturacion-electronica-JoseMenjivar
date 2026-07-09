# Seeds con transmisión automática y correo (solo TEST)

Estas seeds crean DTE, los transmiten secuencialmente a Hacienda TEST y, solo después de que el DTE es `ACEPTADO`, envían PDF y JSON al correo configurado para el cliente de seed.

## Seguridad

- Solo funciona con `MH_ENV=TEST` y empresa emisora en ambiente `TEST`.
- Por defecto no transmite ni envía correos: `SEED_AUTO_TRANSMIT=false` y `SEED_AUTO_EMAIL=false`.
- Para activar el correo se requiere también activar la transmisión.
- Cuando el DTE queda `FIRMADO` por un resultado ambiguo o timeout, la seed se detiene para revisión manual; no retransmite a ciegas.
- El correo se registra en `email_logs`; al reejecutar, un DTE aceptado no se transmite de nuevo y no duplica el correo al mismo destinatario.
- Use buzones de prueba que controles. Una batch completa puede generar cientos de correos.

## Variables mínimas

Copie el contenido de `.env.seeds.example` al `.env` de ejecución y complete:

```env
SEED_AUTO_TRANSMIT=true
SEED_AUTO_EMAIL=true
SEED_EMAIL_DEFAULT=tu-correo-de-pruebas@dominio.com
SEED_TRANSMIT_DELAY_MS=1000
SEED_EMAIL_DELAY_MS=500
SEED_STOP_ON_ERROR=true
```

Puede definir destinatarios distintos:

```env
SEED_EMAIL_CONSUMER_FINAL=...
SEED_EMAIL_CARLOS=...
SEED_EMAIL_EXCLUDED_SUBJECT=...
```

## Ejecución local con Docker Compose

Ejecute una seed por vez. Por ejemplo:

```powershell
docker compose exec -e CONFIRM_SEED_FCF=true backend node scripts/02-seed-fcf-dinamico.js
docker compose exec -e CONFIRM_SEED_EXPORTACION=true backend node scripts/03-seed-exportacion-dinamico.js
docker compose exec -e CONFIRM_SEED_CCF=true backend node scripts/04-seed-ccf-dinamico.js
docker compose exec -e CONFIRM_SEED_FSEE=true backend node scripts/10-seed-fsee-dinamico.js
```

La seed de notas de crédito sigue requiriendo que los 75 CCF de la misma batch estén `ACEPTADO` y tengan sello de Hacienda:

```powershell
docker compose exec -e CONFIRM_SEED_NC=true backend node scripts/09-seed-notas-credito-dinamico.js
```

No se debe usar para producción fiscal.
