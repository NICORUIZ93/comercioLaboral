'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
       
    queryInterface.bulkInsert(
      "Categorias",
      [
        {
          id: 1,
          nombre: "Administrador",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nombre: "Vendedor",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          nombre: "Comprador",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categorias", null, {});
  }
};
