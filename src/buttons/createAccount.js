const { createAccountModal } = require('../modals/createAccountModal');
module.exports = async interaction => interaction.showModal(createAccountModal());
