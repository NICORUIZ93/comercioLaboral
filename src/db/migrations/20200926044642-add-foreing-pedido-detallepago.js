"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("DetallePagos", {
        fields: ["idPedido"],
        type: "foreign key",
        name: "DetallePagos_idPedido_Pedidos_fk",
        references: {
          table: "Pedidos",
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
        "DetallePagos",
        "DetallePagos_idPedido_Pedidos_fk"
      )
    ]);
  },
};
