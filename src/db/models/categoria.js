'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Producto, { foreignKey: "IdCategoria" });
      this.hasMany(models.Categoria, {as: "SubCategorias", foreignKey: "IdPadre" });
    
    }
  };
  Categoria.init({
    IdPadre: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    estado: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'Categorias',
    name: {
      singular: 'Categoria',
      plural: 'Categorias',
    }
  });
  return Categoria;
};