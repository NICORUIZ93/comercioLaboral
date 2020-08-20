'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addConstraint("Pedidos", {
      fields: ["IdUsuario"],
      type: "foreign key",
      name: "Pedidos_IdUsuario_Usuarios_fk",
      references: {
        table: "Usuarios",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Pedidos", {
      fields: ["IdTienda"],
      type: "foreign key",
      name: "Pedidos_IdTienda_Tiendas_fk",
      references: {
        table: "Tiendas",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Pedidos","Pedidos_IdUsuario_Usuarios_fk");
    await queryInterface.removeConstraint("Pedidos","Pedidos_IdTienda_Tiendas_fk");
  }
};
