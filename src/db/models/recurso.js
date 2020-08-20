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
      
      this.belongsToMany(models.Producto, {
        through: models.ProductoRecurso,
        foreignKey: "IdRecurso",
        otherKey: "IdProducto",
      });

      this.belongsToMany(models.Tienda, {
        through: models.TiendaRecurso,
        foreignKey: "IdRecurso",
        otherKey: "IdTienda",
      });

    }
  };
  Recurso.init({
    nombre: DataTypes.STRING,
    key: DataTypes.STRING,
    extension:DataTypes.STRING,
    prioridad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recurso',
  });
  return Recurso;
};