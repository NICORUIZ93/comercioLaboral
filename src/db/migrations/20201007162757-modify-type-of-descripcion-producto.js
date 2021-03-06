'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Productos', 'descripcion', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Productos', 'descripcion', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};
