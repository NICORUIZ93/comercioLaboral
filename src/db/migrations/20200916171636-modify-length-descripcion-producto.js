'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Productos', 'descripcion', {
      type: Sequelize.STRING(1500),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Productos', 'descripcion', {
      type: Sequelize.STRING(1500),
      allowNull: true
    });
  }
};
