"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.bulkInsert("Usuarios",[{
          nombre: "ADMIN",
          apellido: "ADMIN",
          correo: "admin@gmail.com",
          dni: "1022381177",
          telefono: "15242",
          direccion: "cll 44 b bis sur # 73 a 16",
          contrasena: "adminpass",
          username: "ADMIN1",
          IdRol: 1
        },
      ],
      {}
    );

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Usuarios", { username: 'ADMIN1' }, {});
  },
};
