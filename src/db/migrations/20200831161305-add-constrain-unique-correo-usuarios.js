'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Usuarios', {
      type: 'unique',
      name: 'Usuarios_unique_constraint_id_correo',
      fields: ['id', 'correo']
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Usuarios', 'Usuarios_unique_constraint_id_correo');
  }
};
