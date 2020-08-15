"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasOne(models.Usuario, {foreignKey: "IdRol"})
    }
  }
  Rol.init(
    {
      nombre: DataTypes.STRING,
      estado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "Roles",
    }
  );
  return Rol;
};
