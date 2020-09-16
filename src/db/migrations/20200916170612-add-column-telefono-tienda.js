'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tiendas', 'telefono', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Tiendas', 'telefono', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
