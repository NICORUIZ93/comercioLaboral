'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tiendas", "calificacion", Sequelize.DECIMAL)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tiendas", "calificacion")
  }
};
