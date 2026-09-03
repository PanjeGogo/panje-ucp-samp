const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
function createAccountModal() {
  return new ModalBuilder().setCustomId('ucp:modal:create').setTitle('Create Account')
    .addComponents(
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('username').setLabel('Username').setStyle(TextInputStyle.Short).setMinLength(3).setMaxLength(24).setRequired(true)),
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('password').setLabel('Password').setStyle(TextInputStyle.Short).setMinLength(8).setMaxLength(72).setRequired(true)),
      new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('email').setLabel('Email').setStyle(TextInputStyle.Short).setMaxLength(254).setRequired(true))
    );
}
module.exports = { createAccountModal };
