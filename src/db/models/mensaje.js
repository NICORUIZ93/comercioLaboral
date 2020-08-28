'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Mensaje, {as: "SubMensajes", foreignKey: "IdMensaje" });
    }
  };
  Mensaje.init({
    IdTienda: DataTypes.INTEGER,
    IdProducto: DataTypes.INTEGER,
    mensaje: DataTypes.STRING,
    remitente: DataTypes.STRING,
    IdUsuario: DataTypes.INTEGER,
    esVendedor: DataTypes.BOOLEAN,
    IdMensaje: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mensaje',
  });
  return Mensaje;
};