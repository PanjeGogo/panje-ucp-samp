const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
function changePasswordModal() { return new ModalBuilder().setCustomId('ucp:modal:password').setTitle('Change Password').addComponents(
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('current').setLabel('Current Password').setStyle(TextInputStyle.Short).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('new').setLabel('New Password').setStyle(TextInputStyle.Short).setMinLength(8).setMaxLength(72).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('confirm').setLabel('Confirm New Password').setStyle(TextInputStyle.Short).setRequired(true))
); }
module.exports = { changePasswordModal };
