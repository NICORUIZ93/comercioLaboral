'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("Envios", {
        fields: ["idTienda"],
        type: "foreign key",
        name: "Envios_IdTienda_Tiendas_fk",
        references: {
          table: "Tiendas",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("Envios", {
        fields: ["idPedido"],
        type: "foreign key",
        name: "Envios_IdPedido_Pedidos_fk",
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
        "Envios",
        "Envios_IdTienda_Tiendas_fk"
      ),
      await queryInterface.removeConstraint(
        "Envios",
        "Envios_IdPedido_Pedidos_fk"
      ),
    ]);
  },
};

