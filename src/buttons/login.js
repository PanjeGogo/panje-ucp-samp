const { loginModal } = require('../modals/loginModal');
module.exports = async interaction => interaction.showModal(loginModal());
