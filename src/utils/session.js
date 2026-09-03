const { SESSION_TTL_MS } = require('../config/constants');
const sessions = new Map();
const rateLimits = new Map();

function setSession(discordId, user) {
  const now = Date.now();
  sessions.set(discordId, { userId: user.id, username: user.username, lastActivity: now, expiresAt: now + SESSION_TTL_MS });
}
function getSession(discordId) {
  const s = sessions.get(discordId);
  if (!s || s.expiresAt <= Date.now()) { sessions.delete(discordId); return null; }
  s.lastActivity = Date.now(); s.expiresAt = s.lastActivity + SESSION_TTL_MS; return s;
}
function clearSession(discordId) { sessions.delete(discordId); }
function allowed(discordId, interval) { const now = Date.now(); const last = rateLimits.get(discordId) || 0; if (now - last < interval) return false; rateLimits.set(discordId, now); return true; }
setInterval(() => { const now = Date.now(); for (const [id, s] of sessions) if (s.expiresAt <= now) sessions.delete(id); }, 5 * 60 * 1000).unref();
module.exports = { setSession, getSession, clearSession, allowed };
