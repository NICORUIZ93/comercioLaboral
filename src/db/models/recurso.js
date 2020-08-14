'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recurso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recurso.init({
    nombre: DataTypes.STRING,
    url: DataTypes.STRING,
    prioridad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recurso',
  });
  return Recurso;
};