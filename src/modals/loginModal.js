const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { login } = require('../utils/auth');
const { setSession } = require('../utils/session');
function loginModal() { return new ModalBuilder().setCustomId('ucp:modal:login').setTitle('Login').addComponents(
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('username').setLabel('Username').setStyle(TextInputStyle.Short).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('password').setLabel('Password').setStyle(TextInputStyle.Short).setRequired(true))
); }
async function handleLogin(interaction) { try { const user=await login(interaction.fields.getTextInputValue('username').trim(),interaction.fields.getTextInputValue('password'),interaction.user.id); setSession(interaction.user.id,user); return interaction.reply({content:`✅ Login berhasil sebagai **${user.username}**.`,ephemeral:true}); } catch(e) { return interaction.reply({content:`❌ ${e.message}`,ephemeral:true}); } }
module.exports = { loginModal, handleLogin };
