const { changePasswordModal } = require('../modals/changePasswordModal');
module.exports = async interaction => interaction.showModal(changePasswordModal());
