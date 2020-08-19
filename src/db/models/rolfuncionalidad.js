'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolFuncionalidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RolFuncionalidad.init({
    IdRol: DataTypes.INTEGER,
    IdFuncionalidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolFuncionalidad',
  });
  return RolFuncionalidad;
};