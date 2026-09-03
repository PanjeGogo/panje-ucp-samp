const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
function loginModal() { return new ModalBuilder().setCustomId('ucp:modal:login').setTitle('Login').addComponents(
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('username').setLabel('Username').setStyle(TextInputStyle.Short).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('password').setLabel('Password').setStyle(TextInputStyle.Short).setRequired(true))
); }
module.exports = { loginModal };
