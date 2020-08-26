"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("TiendaRecursos", {
        fields: ["IdTienda"],
        type: "foreign key",
        name: "TiendaRecursos_IdTienda_Tiendas_fk",
        references: {
          table: "Tiendas",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("TiendaRecursos", {
        fields: ["IdRecurso"],
        type: "foreign key",
        name: "TiendaRecursos_IdRecurso_Recursos_fk",
        references: {
          table: "Recursos",
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
        "TiendaRecursos",
        "TiendaRecursos_IdTienda_Tiendas_fk"
      ),
      await queryInterface.removeConstraint(
        "TiendaRecursos",
        "TiendaRecursos_IdRecurso_Recursos_fk"
      ),
    ]);
  },
};
