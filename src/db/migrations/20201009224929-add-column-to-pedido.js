'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Pedidos", "estadoEnvio", Sequelize.STRING)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Pedidos", "estadoEnvio", Sequelize.STRING)
    ]);
  }
};
