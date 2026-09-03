const { queryServer } = require('../utils/sampQuery');
module.exports = async interaction => {
  await interaction.deferReply({ephemeral:true});
  try { const s = await queryServer(); const uptimeRule = process.env.SAMP_UPTIME_RULE || 'uptime'; const uptime = (s.rules || []).find(r => String(r.name).toLowerCase() === uptimeRule.toLowerCase());
    const embed = {title:'🖥️ SA-MP Server Info',fields:[
      {name:'Hostname',value:String(s.hostname || '-'),inline:false},{name:'Players',value:`${s.online ?? 0}/${s.maxplayers ?? 0}`,inline:true},
      {name:'Map',value:String(s.mapname || '-'),inline:true},{name:'Gamemode',value:String(s.gamemode || '-'),inline:true},{name:'Uptime',value:uptime ? String(uptime.value) : 'N/A (tambahkan rule uptime)',inline:true}]};
    return interaction.editReply({embeds:[embed]});
  } catch { return interaction.editReply({content:'❌ Server SA-MP tidak dapat di-query saat ini.'}); }
};
