"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([

      await queryInterface.createTable("UsuariosTiendas", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        IdTienda: {
          type: Sequelize.INTEGER,
        },
        IdUsuario: {
          type: Sequelize.INTEGER,
        },
        esAdministrador: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),

      await queryInterface.addConstraint("UsuariosTiendas", {
        fields: ["IdUsuario"],
        type: "foreign key",
        name: "UsuariosTiendas_IdUsuario_Usuarios_fk",
        references: {
          table: "Usuarios",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("UsuariosTiendas", {
        fields: ["IdTienda"],
        type: "foreign key",
        name: "UsuariosTiendas_IdTienda_Tiendas_fk",
        references: {
          table: "Tiendas",
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
        "Pedidos",
        "Pedidos_IdUsuario_Usuarios_fk"
      ),
      await queryInterface.removeConstraint(
        "Pedidos",
        "Pedidos_IdTienda_Tiendas_fk"
      ),
      await queryInterface.dropTable("UsuariosTiendas")
    ]);
  },
};
