'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Categorias", "imagen", Sequelize.STRING)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Categorias", "imagen", Sequelize.STRING)
    ]);
  }
};
