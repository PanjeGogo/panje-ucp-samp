const { pool } = require('../utils/database');
const { TOP_PAGE_SIZE } = require('../config/constants');

async function renderTop(interaction, page = 1, update = false) {
  const offset = (page - 1) * TOP_PAGE_SIZE;
  const [rows] = await pool.execute(`SELECT char_name, level, score, money FROM characters ORDER BY level DESC, score DESC, money DESC LIMIT ? OFFSET ?`, [TOP_PAGE_SIZE, offset]);
  const lines = rows.length ? rows.map((p,i)=>`**${offset+i+1}. ${p.char_name}** — Lv.${p.level} • Score ${p.score} • $${p.money}`).join('\n') : 'Tidak ada data.';
  const components = [{type:1,components:[{type:2,custom_id:`ucp:top:page:${Math.max(1,page-1)}`,label:'Previous',style:2,disabled:page<=1},{type:2,custom_id:`ucp:top:page:${page+1}`,label:'Next',style:1,disabled:rows.length<TOP_PAGE_SIZE}]}];
  const payload = {embeds:[{title:`🏆 Top Players — Page ${page}`,description:lines}],components,ephemeral:true};
  if (update) return interaction.update(payload); return interaction.reply(payload);
}
module.exports = async interaction => renderTop(interaction, 1, false);
module.exports.renderTop = renderTop;
