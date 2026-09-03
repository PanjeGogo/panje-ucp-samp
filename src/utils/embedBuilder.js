const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { CUSTOM_IDS } = require('../config/constants');

function panelEmbed() {
  return new EmbedBuilder().setTitle('🎮 SA-MP UCP').setDescription('Gunakan tombol di bawah untuk mengelola akun SA-MP.\n\n🔐 Status login ditampilkan secara pribadi agar tidak bocor ke pengguna lain.').setColor(0x5865F2).setFooter({ text: 'Panje UCP • SA-MP' });
}
function panelRows() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(CUSTOM_IDS.CREATE).setLabel('Create Account').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId(CUSTOM_IDS.LOGIN).setLabel('Login').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId(CUSTOM_IDS.PROFILE).setLabel('Profile').setStyle(ButtonStyle.Secondary)
    ),
    new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(CUSTOM_IDS.SERVER).setLabel('Server Info').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(CUSTOM_IDS.PASSWORD).setLabel('Change Password').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(CUSTOM_IDS.TOP).setLabel('Top Players').setStyle(ButtonStyle.Primary)
    )
  ];
}
module.exports = { panelEmbed, panelRows };
