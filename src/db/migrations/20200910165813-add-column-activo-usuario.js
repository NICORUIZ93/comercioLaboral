'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Usuarios", "activo", {
      type: Sequelize.BOOELAN,
      defaultValue: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Usuarios", "activo")
  }
};

