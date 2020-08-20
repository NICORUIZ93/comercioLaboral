'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Producto, {
        through: models.DetallePedido,
        foreignKey: "IdPedido",
        otherKey: "IdProducto",
      });

      this.belongsTo(models.Tienda, {
        foreignKey: "IdTienda"
      });

      this.belongsTo(models.Usuario, {
        foreignKey: "IdUsuario"
      });
      
    }
  };
  Pedido.init({
    IdTienda: DataTypes.INTEGER,
    IdUsuario: DataTypes.INTEGER,
    valorTotal: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};