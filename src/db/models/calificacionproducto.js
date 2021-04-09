'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calificacionProductos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   
      this.belongsTo(models.Producto, {
        foreignKey: "IdProducto"
      });

      this.belongsTo(models.Usuario, {
        foreignKey: "IdUsuario"
      });
     
    }
  };
  calificacionProductos.init({
    IdProducto: DataTypes.INTEGER,
    IdUsuario: DataTypes.INTEGER,
    calificacion: DataTypes.INTEGER,
    comentario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'calificacionProductos',
  });
  return calificacionProductos;
};