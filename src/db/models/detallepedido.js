'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallePedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Rol, {
        foreignKey: "IdProducto"
      });

      this.belongsTo(models.Pedido, {
        foreignKey: "IdPedido",
        as: 'Pedido'
      });

    }
  };
  DetallePedido.init({
    IdPedido: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdProducto: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL,
    descuento: DataTypes.DECIMAL,
    impuestos: DataTypes.DECIMAL
  },
  {
    sequelize,
    modelName: "DetallePedido",
    tableName: "DetallePedidos"
  }
  );
  return DetallePedido;
};