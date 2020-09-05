'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Tienda, { foreignKey: "idCiudad" });
    }
  };
  Ciudad.init({
    region: DataTypes.STRING,
    c_digo_dane_del_departamento: DataTypes.STRING,
    departamento: DataTypes.STRING,
    c_digo_dane_del_municipio: DataTypes.STRING,
    municipio: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Ciudad",
    tableName: "Ciudades",
    name: {
      singular: 'Ciudad',
      plural: 'Ciudades',
    }
  });
  return Ciudad;
};