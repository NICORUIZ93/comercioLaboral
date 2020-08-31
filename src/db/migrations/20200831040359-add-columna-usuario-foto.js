'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Usuarios", "IdFoto", Sequelize.INTEGER),
      await queryInterface.addConstraint("Usuarios", {
        fields: ["IdFoto"],
        type: "foreign key",
        name: "Usuarios_IdUsuario_fk",
        references: {
          table: "Recursos",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Usuarios", "IdFoto"),
      await queryInterface.removeConstraint(
        "Usuarios",
        "Usuarios_IdUsuario_fk"
      ),
    ]);
  }
};
 