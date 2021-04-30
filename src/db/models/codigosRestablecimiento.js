//codigosRestablecimiento
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class codigosRestablecimiento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   
     
     
    }
  };
  codigosRestablecimiento.init({
    codigo: DataTypes.INTEGER,
    IdTienda :DataTypes.INTEGER,
    correo : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'codigosRestablecimiento',
  });
  return codigosRestablecimiento;
};