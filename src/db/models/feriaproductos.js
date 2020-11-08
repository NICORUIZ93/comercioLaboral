'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feriaproductos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Feria, { foreignKey: 'idFeria' });
      this.belongsTo(models.Producto, { foreignKey: 'idProducto'});
    }
  };
  Feriaproductos.init({
    idFeria: DataTypes.INTEGER,
    idProducto: DataTypes.INTEGER,
    idTienda: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feriaproductos',
  });
  return Feriaproductos;
};