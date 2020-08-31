'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Usuarios", "username")
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Usuarios", "username", Sequelize.STRING)
  }
};
