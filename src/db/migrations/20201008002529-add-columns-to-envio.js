'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Envios", "fotoGuia", Sequelize.STRING),
      await queryInterface.addColumn("Envios", "transportadora", Sequelize.STRING),
      await queryInterface.addColumn("Envios", "numeroGuia", Sequelize.STRING),
      await queryInterface.addColumn("Envios", "comentarios", Sequelize.TEXT)
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Envios", "fotoGuia", Sequelize.STRING),
      await queryInterface.removeColumn("Envios", "transportadora", Sequelize.STRING),
      await queryInterface.removeColumn("Envios", "numeroGuia", Sequelize.STRING),
      await queryInterface.removeColumn("Envios", "comentarios", Sequelize.TEXT)
    ]);
  }
};
