'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Productos", "porMayor", Sequelize.BOOLEAN),
      await queryInterface.addColumn("Productos", "valorPorMayor", Sequelize.DECIMAL),
      await queryInterface.addColumn("Productos", "tags", Sequelize.TEXT),
      await queryInterface.addColumn("Productos", "caracteristicas", Sequelize.TEXT)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Productos", "porMayor", Sequelize.BOOLEAN),
      await queryInterface.removeColumn("Productos", "valorPorMayor", Sequelize.DECIMAL),
      await queryInterface.removeColumn("Productos", "tags", Sequelize.TEXT),
      await queryInterface.removeColumn("Productos", "caracteristicas", Sequelize.TEXT)
    ]);
  }
};

