'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addConstraint("Productos", {
      fields: ["IdCategoria"],
      type: "foreign key",
      name: "Productos_IdCategoria_Categorias_fk",
      references: {
        table: "Categorias",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Productos","Productos_IdCategoria_Categorias_fk");
  }
};
