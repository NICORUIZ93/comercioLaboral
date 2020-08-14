'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasOne(models.Rol)
    }
  };
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: DataTypes.STRING,
    dni: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    username: DataTypes.STRING,
    IdRol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};