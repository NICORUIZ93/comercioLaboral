'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Pedidos", "valorComisionMarket", Sequelize.DECIMAL),
      await queryInterface.addColumn("Pedidos", "valorTotalConComison", Sequelize.DECIMAL)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Pedidos", "valorComisionMarket", Sequelize.DECIMAL),
      await queryInterface.removeColumn("Pedidos", "valorTotalConComison", Sequelize.DECIMAL)
    ]);
  }
};