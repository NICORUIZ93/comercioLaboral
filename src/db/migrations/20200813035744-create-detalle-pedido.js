'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetallePedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IdPedido: {
        type: Sequelize.INTEGER
      },
      IdProducto: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      descuento: {
        type: Sequelize.DECIMAL
      },
      impuestos: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetallePedidos');
  }
};