'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Tiendas", "userIdMP", Sequelize.BIGINT),
      await queryInterface.addColumn("Tiendas", "refreshTokenMP", Sequelize.STRING),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Tiendas", "userIdMP", Sequelize.BIGINT),
      await queryInterface.removeColumn("Tiendas", "refreshTokenMP", Sequelize.STRING),
    ]);
  }
};