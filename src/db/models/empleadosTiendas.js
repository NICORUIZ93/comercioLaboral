'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empleadosTiendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

     

    }
  };
  empleadosTiendas.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dni: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    direccion: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    IdRol: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idTienda: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    billetera: DataTypes.BOOLEAN,
    productos: DataTypes.BOOLEAN,
    pedidos :  DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'empleadosTiendas',
  });
  return empleadosTiendas;
};