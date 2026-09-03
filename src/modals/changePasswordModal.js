const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { changePassword } = require('../utils/auth');
const { getSession } = require('../utils/session');
function changePasswordModal() { return new ModalBuilder().setCustomId('ucp:modal:password').setTitle('Change Password').addComponents(
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('current').setLabel('Current Password').setStyle(TextInputStyle.Short).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('new').setLabel('New Password').setStyle(TextInputStyle.Short).setMinLength(8).setMaxLength(72).setRequired(true)),
  new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('confirm').setLabel('Confirm New Password').setStyle(TextInputStyle.Short).setRequired(true))
); }
async function handleChange(interaction) { const s=getSession(interaction.user.id); if(!s) return interaction.reply({content:'❌ Kamu belum login.',ephemeral:true}); const current=interaction.fields.getTextInputValue('current'), next=interaction.fields.getTextInputValue('new'), confirm=interaction.fields.getTextInputValue('confirm'); if(next!==confirm) return interaction.reply({content:'❌ Konfirmasi password tidak sama.',ephemeral:true}); try { await changePassword(s.userId,current,next); return interaction.reply({content:'✅ Password berhasil diubah.',ephemeral:true}); } catch(e) { return interaction.reply({content:`❌ ${e.message}`,ephemeral:true}); } }
module.exports = { changePasswordModal, handleChange };
