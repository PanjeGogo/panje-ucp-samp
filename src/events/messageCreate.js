const { sendUcp } = require('../commands/ucp');
module.exports = async message => {
  if (message.author.bot || !message.guild || message.content.trim() !== '!ucp') return;
  const roleId = process.env.ADMIN_ROLE_ID;
  if (!roleId || !message.member.roles.cache.has(roleId)) return;
  try { await message.delete().catch(()=>{}); await sendUcp(message); } catch (e) { console.error('UCP command error:', e); }
};
