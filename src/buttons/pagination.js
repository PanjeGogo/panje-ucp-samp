const { renderTop } = require('./topPlayers');
module.exports = async interaction => { const page = Math.max(1, Number(interaction.customId.split(':').pop()) || 1); return renderTop(interaction, page, true); };
