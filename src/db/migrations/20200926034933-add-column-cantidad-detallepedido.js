'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DetallePedidos', 'cantidad', {
      type: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('DetallePedidos', 'cantidad', Sequelize.INTEGER);
  }
};
