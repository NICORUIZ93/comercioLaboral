"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("Feriaproductos", {
        fields: ["idFeria"],
        type: "foreign key",
        name: "FeriaProductos_IdFeria_Ferias_fk",
        references: {
          table: "Feria",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("Feriaproductos", {
        fields: ["idProducto"],
        type: "foreign key",
        name: "FeriaProductos_IdProducto_Productos_fk",
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
        "Feriaproductos",
        "FeriaProductos_IdFeria_Ferias_fk"
      ),
      await queryInterface.removeConstraint(
        "Feriaproductos",
        "FeriaProductos_IdProducto_Productos_fk"
      ),
    ]);
  },
};