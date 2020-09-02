'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Productos", "calificacion", Sequelize.DECIMAL)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Productos", "calificacion")
  }
};

