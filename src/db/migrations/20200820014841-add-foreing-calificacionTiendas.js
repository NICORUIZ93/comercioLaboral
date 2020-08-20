'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addConstraint("CalificacionTiendas", {
      fields: ["IdTienda"],
      type: "foreign key",
      name: "CalificacionTiendas_IdTienda_Tiendas_fk",
      references: {
        table: "Tiendas",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("CalificacionTiendas","CalificacionTiendas_IdTienda_Tiendas_fk");
  }
};
