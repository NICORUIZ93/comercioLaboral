"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("DetallePedidos", {
        fields: ["IdPedido"],
        type: "foreign key",
        name: "DetallePedidos_IdPedido_Pedidos_fk",
        references: {
          table: "Pedidos",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("DetallePedidos", {
        fields: ["IdProducto"],
        type: "foreign key",
        name: "DetallePedidos_IdProducto_Productos_fk",
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
        "DetallePedidos",
        "DetallePedidos_IdPedido_Pedidos_fk"
      ),
      await queryInterface.removeConstraint(
        "DetallePedidos",
        "DetallePedidos_IdProducto_Productos_fk"
      ),
    ]);
  },
};
