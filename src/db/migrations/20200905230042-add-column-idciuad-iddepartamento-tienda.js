'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Tiendas", "idDepartamento", Sequelize.INTEGER),
      await queryInterface.addColumn("Tiendas", "idCiudad", Sequelize.INTEGER)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Tiendas", "idDepartamento", Sequelize.INTEGER),
      await queryInterface.removeColumn("Tiendas", "idCiudad", Sequelize.INTEGER)
    ]);
  }
};
