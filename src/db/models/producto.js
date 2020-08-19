'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Categoria, {
        foreignKey: "IdCategoria"
      });
      /*
      this.belongsTo(models.Recurso, {
        foreignKey: "IdRecurso"
      });
      */
    }
  };
  Producto.init({
    nombre: DataTypes.STRING,
    IdCategoria: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    cantidad: DataTypes.INTEGER,
    maxFotos: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};