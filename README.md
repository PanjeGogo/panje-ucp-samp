# Panje UCP SA-MP

Discord.js v14 User Control Panel (UCP) for an SA-MP server.

## Features
- Admin-only `!ucp` command via `ADMIN_ROLE_ID`.
- Create account, login, profile, change password, server info, top players and logout through buttons/modals.
- bcrypt password hashing and parameterized MySQL queries.
- Discord account binding on first successful login.
- In-memory sessions with 24-hour inactivity expiry and basic rate limiting.
- SA-MP server query through `samp-query`.
- Top 10 leaderboard with pagination.

## Requirements
- Node.js 20.11+
- MySQL 8+ or compatible MariaDB
- Reachable SA-MP query port
- Discord bot with **Message Content Intent** enabled

## Setup
1. Run `npm install`.
2. Copy `.env.example` to `.env` and fill in the values.
3. Import `sql/schema.sql` into MySQL.
4. Enable Message Content Intent in the Discord Developer Portal.
5. Run `npm start` or `npm run dev`.
6. In the Discord server, an admin with `ADMIN_ROLE_ID` sends exactly `!ucp`.

## Security
Never commit `.env`, Discord tokens, or database passwords. Passwords are bcrypt-hashed and SQL uses parameters.

## SA-MP uptime
Standard SA-MP query data does not guarantee uptime. If the server exposes a custom query rule named by `SAMP_UPTIME_RULE` (default `uptime`), it is displayed; otherwise uptime is `N/A`.

## Architecture
`src/index.js` starts the client/database. `events/` routes events, `buttons/` handles buttons, `modals/` handles forms, and `utils/` contains database/auth/session/SA-MP helpers.

The shared panel is intentionally static. Login/profile status is ephemeral and user-specific, because one Discord message cannot display different login states to different users.
