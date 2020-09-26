'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetallePagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPedido: {
        type: Sequelize.BIGINT
      },
      idMp: {
        type: Sequelize.BIGINT
      },
      monto_transaccion: {
        type: Sequelize.DECIMAL
      },
      monto_total_pagado: {
        type: Sequelize.DECIMAL
      },
      costo_envio: {
        type: Sequelize.DECIMAL
      },
      moneda: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      detalle_estado: {
        type: Sequelize.STRING
      },
      tipo_operacion: {
        type: Sequelize.STRING
      },
      fecha_aprobado: {
        type: Sequelize.DATE
      },
      fecha_creado: {
        type: Sequelize.DATE
      },
      ultima_modificacion: {
        type: Sequelize.DATE
      },
      monto_reembolsado: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('DetallePagos');
  }
};