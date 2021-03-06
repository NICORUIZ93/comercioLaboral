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
      
      this.hasMany(models.Usuario, { foreignKey: "IdRol" });

      this.belongsToMany(models.Funcionalidad, {
        through: models.RolFuncionalidad,
        foreignKey: "IdRol",
        otherKey: "IdFuncionalidad",
      });

    }
  }
  Rol.init(
    {
      nombre: DataTypes.STRING,
      estado: {
        type:DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "Roles",
      name: {
        singular: 'Rol',
        plural: 'Roles',
      }
    }
  );
  return Rol;
};
