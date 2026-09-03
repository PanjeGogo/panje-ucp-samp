const { CUSTOM_IDS, RATE_LIMIT_MS } = require('../config/constants');
const { allowed, getSession, clearSession } = require('../utils/session');
const { logoutUser } = require('../utils/auth');
const create = require('../buttons/createAccount'); const login = require('../buttons/login'); const profile = require('../buttons/profile'); const server = require('../buttons/serverInfo'); const password = require('../buttons/changePassword'); const top = require('../buttons/topPlayers'); const pagination = require('../buttons/pagination');
const { handleCreate } = require('../modals/createAccountModal'); const { handleLogin } = require('../modals/loginModal'); const { handleChange } = require('../modals/changePasswordModal');

module.exports = async interaction => {
  try {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'ucp:modal:create') return handleCreate(interaction);
      if (interaction.customId === 'ucp:modal:login') return handleLogin(interaction);
      if (interaction.customId === 'ucp:modal:password') return handleChange(interaction);
      return;
    }
    if (!interaction.isButton()) return;
    if (!allowed(interaction.user.id, RATE_LIMIT_MS)) return interaction.reply({content:'⏳ Tunggu beberapa detik sebelum mencoba lagi.',ephemeral:true});
    switch (interaction.customId) {
      case CUSTOM_IDS.CREATE: return create(interaction); case CUSTOM_IDS.LOGIN: return login(interaction); case CUSTOM_IDS.PROFILE: return profile(interaction); case CUSTOM_IDS.SERVER: return server(interaction); case CUSTOM_IDS.PASSWORD: return password(interaction); case CUSTOM_IDS.TOP: return top(interaction); case CUSTOM_IDS.REFRESH: return profile(interaction);
      case CUSTOM_IDS.LOGOUT: { const s=getSession(interaction.user.id); if(s) await logoutUser(s.userId); clearSession(interaction.user.id); return interaction.update({content:'✅ Kamu telah logout.',embeds:[],components:[]}); }
      default: if (interaction.customId.startsWith('ucp:top:page:')) return pagination(interaction);
    }
  } catch (e) { console.error('Interaction error:', e); if (!interaction.replied && !interaction.deferred) await interaction.reply({content:'❌ Terjadi kesalahan internal.',ephemeral:true}).catch(()=>{}); }
};
