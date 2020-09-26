'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallePago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Pedido, {
        foreignKey: "idPedido",
        as: 'Pedido'
      });
    }
  };
  DetallePago.init({
    idMp: DataTypes.BIGINT,
    idPedido: DataTypes.BIGINT,
    monto_transaccion: DataTypes.DECIMAL,
    monto_total_pagado: DataTypes.DECIMAL,
    costo_envio: DataTypes.DECIMAL,
    moneda: DataTypes.STRING,
    estado: DataTypes.STRING,
    detalle_estado: DataTypes.STRING,
    tipo_operacion: DataTypes.STRING,
    fecha_aprobado: DataTypes.DATE,
    fecha_creado: DataTypes.DATE,
    ultima_modificacion: DataTypes.DATE,
    monto_reembolsado: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'DetallePago',
  });
  return DetallePago;
};