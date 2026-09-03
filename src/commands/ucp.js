const { panelEmbed, panelRows } = require('../utils/embedBuilder');

async function sendUcp(message) {
  const panel = await message.channel.send({ embeds: [panelEmbed()], components: panelRows() });
  return panel;
}
module.exports = { sendUcp };
