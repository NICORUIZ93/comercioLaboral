'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Productos", "feria", Sequelize.BOOLEAN),
      await queryInterface.addColumn("Productos", "valorFeria", Sequelize.DECIMAL)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Productos", "feria", Sequelize.BOOLEAN),
      await queryInterface.removeColumn("Productos", "valorFeria", Sequelize.DECIMAL)
    ]);
  }
};