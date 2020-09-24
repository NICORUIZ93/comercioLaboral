"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.bulkInsert("Usuarios",[{
          id:1,
          nombre: "ADMIN",
          apellido: "ADMIN",
          correo: "admin@gmail.com",
          dni: "1022381177",
          telefono: "15242",
          direccion: "cll 44 b bis sur # 73 a 16",
          contrasena: "$2b$10$P03a.VG8D0UDu8vBWHMc9.Pt3DUH/JEWp4cNOKgFyvSf88EjCgyya",
          IdRol: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );

    await queryInterface.sequelize.transaction(async (transaction) => {
      const tableName = 'Usuarios';
      const sequenceColumn = 'id';

      const [[{ max }]] = await queryInterface.sequelize.query(`SELECT MAX("${sequenceColumn}") AS max FROM public."${tableName}";`, { transaction });
      await queryInterface.sequelize.query(`ALTER SEQUENCE public."${tableName}_${sequenceColumn}_seq" RESTART WITH ${max + 1};`, { transaction });
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Usuarios", { id: 1 }, {});
  },
};
