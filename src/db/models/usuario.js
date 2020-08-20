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

      this.belongsTo(models.Rol, {
        foreignKey: "IdRol"
      });

      this.hasMany(models.Favorito, {foreignKey: "IdUsuario"});

      this.belongsToMany(models.Producto, {
        through: models.Favorito,
        foreignKey: "IdUsuario",
        otherKey: "IdProducto",
      });

      this.hasMany(models.Pedido, { foreignKey: "IdTienda" });

      this.belongsToMany(models.Tienda, {
        through: models.Pedido,
        foreignKey: "IdUsuario",
        otherKey: "IdTienda",
      });
      
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
    esMayorista: DataTypes.BOOLEAN,
    IdRol: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};