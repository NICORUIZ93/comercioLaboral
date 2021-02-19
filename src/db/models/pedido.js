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

      this.Detalle = this.hasMany(models.DetallePedido, { foreignKey: "IdPedido",  as: 'Detalle' });
      this.Pago = this.hasMany(models.DetallePago, { foreignKey: "idPedido",  as: 'DetallesPago' });
      this.EstadosEnvio = this.hasMany(models.Envio, { foreignKey: "idPedido",  as: 'EstadosEnvio' });

      this.belongsTo(models.Tienda, {
        foreignKey: "IdTienda"
      });

      this.belongsTo(models.Usuario, {
        foreignKey: "IdUsuario"
      });
      
    }
  };
  Pedido.init({
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    IdTienda: DataTypes.INTEGER,
    IdUsuario: DataTypes.INTEGER,
    valorTotal: DataTypes.DECIMAL,
    confirmado: DataTypes.BOOLEAN,
    estado: DataTypes.STRING,
    estadoEnvio: DataTypes.STRING,
    uuid: DataTypes.STRING,
    idPago:DataTypes.STRING,
    valorComisionMarket: DataTypes.DECIMAL,
    valorTotalConComison: DataTypes.DECIMAL,
    ciudad: DataTypes.STRING,
    idCiudad: DataTypes.INTEGER,
    direccion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};