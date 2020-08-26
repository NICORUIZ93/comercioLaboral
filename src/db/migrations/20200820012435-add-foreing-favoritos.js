"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("Favoritos", {
        fields: ["IdUsuario"],
        type: "foreign key",
        name: "Favoritos_IdUsuario_Usuarios_fk",
        references: {
          table: "Usuarios",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("Favoritos", {
        fields: ["IdProducto"],
        type: "foreign key",
        name: "Favoritos_IdProducto_Productos_fk",
        references: {
          table: "Productos",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint(
        "Favoritos",
        "Favoritos_IdUsuario_Usuarios_fk"
      ),
      await queryInterface.removeConstraint(
        "Favoritos",
        "Favoritos_IdProducto_Productos_fk"
      ),
    ]);
  },
};
