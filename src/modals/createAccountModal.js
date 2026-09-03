const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { createAccount } = require('../utils/auth');
function createAccountModal() { return new ModalBuilder().setCustomId('ucp:modal:create').setTitle('Create Account').addComponents(
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('username').setLabel('Username').setStyle(TextInputStyle.Short).setMinLength(3).setMaxLength(24).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('password').setLabel('Password').setStyle(TextInputStyle.Short).setMinLength(8).setMaxLength(72).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('email').setLabel('Email').setStyle(TextInputStyle.Short).setMaxLength(254).setRequired(true))
); }
async function handleCreate(interaction) { try { const u=await createAccount(interaction.fields.getTextInputValue('username').trim(),interaction.fields.getTextInputValue('password'),interaction.fields.getTextInputValue('email').trim()); return interaction.reply({embeds:[{title:'✅ Account Created',description:`Akun **${u.username}** berhasil dibuat. Silakan login.`}],components:[{type:1,components:[{type:2,custom_id:'ucp:login',label:'Login',style:1}]}],ephemeral:true}); } catch(e) { return interaction.reply({content:`❌ ${e.message}`,ephemeral:true}); } }
module.exports = { createAccountModal, handleCreate };
