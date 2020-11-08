'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("TiendaFeria", "estado", { type: Sequelize.BOOLEAN, defaultValue: true })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("TiendaFeria", "estado", Sequelize.BOOLEAN)
    ]);
  }
};
