const { queryServer } = require('../utils/sampQuery');
module.exports = async interaction => {
  await interaction.deferReply({ephemeral:true});
  try { const s=await queryServer(); const key=(process.env.SAMP_UPTIME_RULE||'uptime').toLowerCase(); const rules=s.rules||{}; const uptime=rules[key] ?? rules[process.env.SAMP_UPTIME_RULE||'uptime'];
    return interaction.editReply({embeds:[{title:'🖥️ SA-MP Server Info',fields:[
      {name:'Hostname',value:String(s.hostname||'-'),inline:false},{name:'Players',value:`${s.online??0}/${s.maxplayers??0}`,inline:true},{name:'Map',value:String(s.mapname||'-'),inline:true},{name:'Gamemode',value:String(s.gamemode||'-'),inline:true},{name:'Uptime',value:uptime!=null?String(uptime):'N/A (tambahkan rule uptime)',inline:true}]}]});
  } catch(e) { return interaction.editReply({content:'❌ Server SA-MP tidak dapat di-query saat ini.'}); }
};
