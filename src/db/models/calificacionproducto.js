'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalificacionProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Producto, {
        foreignKey: "IdProducto"
      });
    }
  };
  CalificacionProducto.init({
    IdProducto: DataTypes.INTEGER,
    servicio: DataTypes.STRING,
    calificacion: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CalificacionProducto',
  });
  return CalificacionProducto;
};