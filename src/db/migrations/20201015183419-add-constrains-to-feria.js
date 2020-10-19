'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("TiendaFeria", {
        fields: ["idTienda"],
        type: "foreign key",
        name: "TiendaFeria_idTienda_Tiendas_fk",
        references: {
          table: "Tiendas",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

      await queryInterface.addConstraint("TiendaFeria", {
        fields: ["idFeria"],
        type: "foreign key",
        name: "TiendaFeria_idFeria_Ferias_fk",
        references: {
          table: "Feria",
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
        "TiendaFeria",
        "TiendaFeria_idTienda_Tiendas_fk"
      ),
      await queryInterface.removeConstraint(
        "TiendaFeria",
        "TiendaFeria_idFeria_Ferias_fk"
      ),
    ]);
  },
};