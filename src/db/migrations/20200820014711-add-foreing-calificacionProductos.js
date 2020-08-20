'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addConstraint("CalificacionProductos", {
      fields: ["IdProducto"],
      type: "foreign key",
      name: "CalificacionProductos_IdProducto_Productos_fk",
      references: {
        table: "Productos",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("CalificacionProductos","CalificacionProductos_IdProducto_Productos_fk");
  }
};
