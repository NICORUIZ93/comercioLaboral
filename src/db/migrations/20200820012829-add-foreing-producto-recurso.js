"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("ProductoRecursos", {
        fields: ["IdProducto"],
        type: "foreign key",
        name: "ProductoRecursos_IdProducto_Productos_fk",
        references: {
          table: "Productos",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("ProductoRecursos", {
        fields: ["IdRecurso"],
        type: "foreign key",
        name: "ProductoRecursos_IdRecurso_Recursos_fk",
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
      await queryInterface.removeConstraint(
        "ProductoRecursos",
        "ProductoRecursos_IdProducto_Productos_fk"
      ),
      await queryInterface.removeConstraint(
        "ProductoRecursos",
        "ProductoRecursos_IdRecurso_Recursos_fk"
      ),
    ]);
  },
};
