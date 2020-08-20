'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionalidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsToMany(models.Rol, {
        through: models.RolFuncionalidad,
        foreignKey: "IdFuncionalidad",
        otherKey: "IdRol",
      });
    }
  };
  Funcionalidad.init({
    Nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Funcionalidad',
  });
  return Funcionalidad;
};