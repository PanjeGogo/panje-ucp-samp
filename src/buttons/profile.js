const { pool } = require('../utils/database');
const { getSession } = require('../utils/session');
module.exports = async interaction => {
  const session = getSession(interaction.user.id); if (!session) return interaction.reply({content:'❌ Kamu belum login.', ephemeral:true});
  const [rows] = await pool.execute('SELECT id, char_name, level, score, money, skin FROM characters WHERE user_id = ? ORDER BY id ASC', [session.userId]);
  const text = rows.length ? rows.map(c => `**${c.char_name}** — Lv.${c.level} • Score ${c.score} • $${c.money} • Skin ${c.skin}`).join('\n') : 'Belum memiliki karakter.';
  return interaction.reply({embeds:[{title:`👤 Profile — ${session.username}`,description:text}],components:[{type:1,components:[{type:2,custom_id:'ucp:refresh',label:'Refresh',style:2},{type:2,custom_id:'ucp:logout',label:'Logout',style:4}]}],ephemeral:true});
};
