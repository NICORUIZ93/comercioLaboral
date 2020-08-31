"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.bulkInsert("Roles",[{
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
        {
          id: 4,
          nombre: "Empleado",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );

    await queryInterface.sequelize.transaction(async (transaction) => {
      const tableName = 'Roles';
      const sequenceColumn = 'id';

      const [[{ max }]] = await queryInterface.sequelize.query(`SELECT MAX("${sequenceColumn}") AS max FROM public."${tableName}";`, { transaction });
      await queryInterface.sequelize.query(`ALTER SEQUENCE public."${tableName}_${sequenceColumn}_seq" RESTART WITH ${max + 1};`, { transaction });
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
