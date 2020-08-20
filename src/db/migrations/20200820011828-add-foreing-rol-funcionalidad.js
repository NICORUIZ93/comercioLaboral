'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.addConstraint("RolFuncionalidad", {
      fields: ["IdRol"],
      type: "foreign key",
      name: "RolFuncionalidad_IdRol_Roles_fk",
      references: {
        table: "Roles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("RolFuncionalidad", {
      fields: ["IdFuncionalidad"],
      type: "foreign key",
      name: "RolFuncionalidad_IdFuncionalidad_Funcionalidades_fk",
      references: {
        table: "Funcionalidades",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("RolFuncionalidad","RolFuncionalidad_IdRol_Roles_fk");
    await queryInterface.removeConstraint("RolFuncionalidad","RolFuncionalidad_IdFuncionalidad_Funcionalidades_fk");
  }
};
