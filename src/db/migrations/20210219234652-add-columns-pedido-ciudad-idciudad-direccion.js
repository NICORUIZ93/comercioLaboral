'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Pedidos", "idCiudad", Sequelize.INTEGER),
      await queryInterface.addColumn("Pedidos", "ciudad", Sequelize.TEXT),
      await queryInterface.addColumn("Pedidos", "direccion", Sequelize.TEXT)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Pedidos", "idCiudad", Sequelize.INTEGER),
      await queryInterface.removeColumn("Pedidos", "ciudad", Sequelize.TEXT),
      await queryInterface.removeColumn("Pedidos", "direccion", Sequelize.TEXT)
    ]);
  }
};
