'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("TiendaFeria", "urlVideo", Sequelize.STRING)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("TiendaFeria", "urlVideo", Sequelize.STRING)
    ]);
  }
};
