'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addConstraint("TiendaProductos", {
      fields: ["IdTienda"],
      type: "foreign key",
      name: "TiendaProductos_IdTienda_Tiendas_fk",
      references: {
        table: "Tiendas",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("TiendaProductos", {
      fields: ["IdProducto"],
      type: "foreign key",
      name: "TiendaProductos_IdProducto_Productos_fk",
      references: {
        table: "Productos",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("TiendaProductos","TiendaProductos_IdTienda_Tiendas_fk");
    await queryInterface.removeConstraint("TiendaProductos","TiendaProductos_IdProducto_Productos_fk");
  }
};
