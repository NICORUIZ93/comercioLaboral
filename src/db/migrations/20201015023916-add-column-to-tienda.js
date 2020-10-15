'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Tiendas", "verificado", Sequelize.BOOLEAN)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Tiendas", "verificado", Sequelize.BOOLEAN)
    ]);
  }
};

