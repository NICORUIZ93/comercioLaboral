"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addConstraint("Usuarios", {
      fields: ["IdRol"],
      type: "foreign key",
      name: "Usuarios_IdRol_Roles_fk",
      references: {
        table: "Roles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.removeConstraint("Usuarios","Usuarios_IdRol_Roles_fk");
  } 
};
