"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id:1,
          nombre: "Administrador",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:2,
          nombre: "Vendedor",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:3,
          nombre: "Comprador",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
