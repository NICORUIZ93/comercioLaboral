'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Tiendas", "porcentajeComision", Sequelize.DECIMAL),
      await queryInterface.addColumn("Tiendas", "codigoMP", Sequelize.STRING),
      await queryInterface.addColumn("Tiendas", "tokenMP", Sequelize.STRING)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Tiendas", "porcentajeComision", Sequelize.DECIMAL),
      await queryInterface.removeColumn("Tiendas", "codigoMP", Sequelize.INTEGER),
      await queryInterface.addColumn("Tiendas", "tokenMP", Sequelize.STRING)
    ]);
  }
};