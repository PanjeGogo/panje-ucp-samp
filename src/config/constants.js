require('dotenv').config();

module.exports = {
  CUSTOM_IDS: {
    PANEL: 'ucp:panel', CREATE: 'ucp:create', LOGIN: 'ucp:login', PROFILE: 'ucp:profile', SERVER: 'ucp:server', PASSWORD: 'ucp:password', TOP: 'ucp:top', LOGOUT: 'ucp:logout', REFRESH: 'ucp:refresh'
  },
  SESSION_TTL_MS: Number(process.env.SESSION_TTL_HOURS || 24) * 60 * 60 * 1000,
  RATE_LIMIT_MS: Number(process.env.RATE_LIMIT_MS || 3000),
  BCRYPT_ROUNDS: Math.max(10, Number(process.env.BCRYPT_ROUNDS || 12)),
  TOP_PAGE_SIZE: 10
};
