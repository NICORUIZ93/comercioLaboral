'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuariosTienda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: 'IdUsuario' });
      this.belongsTo(models.Tienda, { foreignKey: 'IdTienda'});
    }
  };
  UsuariosTienda.init({
    IdTienda: DataTypes.INTEGER,
    IdUsuario: DataTypes.INTEGER,
    esAdministrador: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UsuariosTienda',
  });
  return UsuariosTienda;
};