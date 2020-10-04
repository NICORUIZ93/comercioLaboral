'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Envio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Pedido, {
        foreignKey: "idPedido"
      });

      this.belongsTo(models.Tienda, {
        foreignKey: "idTienda"
      });

    }
  };
  Envio.init({
    idPedido: DataTypes.INTEGER,
    idTienda: DataTypes.INTEGER,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Envio',
  });
  return Envio;
};