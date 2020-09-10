'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Pedidos", "confirmado", Sequelize.BOOLEAN),
      await queryInterface.addColumn("Pedidos", "uuid", Sequelize.STRING),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Pedidos", "confirmado", Sequelize.BOOLEAN),
      await queryInterface.removeColumn("Pedidos", "uuid"),
    ]);
  }
};
