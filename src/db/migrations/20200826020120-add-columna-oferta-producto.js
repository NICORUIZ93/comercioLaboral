"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Productos", "oferta", Sequelize.BOOLEAN),
      await queryInterface.addColumn("Productos","valorOferta",Sequelize.DECIMAL)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Productos", "oferta"),
      await queryInterface.removeColumn("Productos", "valorOferta"),
    ]);
  },
};
