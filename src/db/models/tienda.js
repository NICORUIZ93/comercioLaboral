'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tienda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Producto, {
        through: models.TiendaProducto,
        foreignKey: "IdTienda",
        otherKey: "IdProducto",
      });

      this.belongsToMany(models.Recurso, {
        through: models.TiendaRecurso,
        foreignKey: "IdTienda",
        otherKey: "IdRecurso",
      });

      this.hasMany(models.Usuario, { foreignKey: "IdTienda" });

      this.hasMany(models.Pedido, { foreignKey: "IdTienda" });

    }
  };
  Tienda.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    IdRecurso: DataTypes.INTEGER,
    banco: DataTypes.STRING,
    numeroCuenta: DataTypes.STRING,
    tipoCuenta: DataTypes.STRING,
    maxFotos: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tienda',
  });
  return Tienda;
};