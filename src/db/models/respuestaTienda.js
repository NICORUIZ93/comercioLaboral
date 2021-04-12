'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class respuestaTienda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     /** 
      this.belongsTo(models.Producto, {
        foreignKey: "IdProducto"
      });

      this.belongsTo(models.Usuario, {
        foreignKey: "IdUsuario"
      });
     */
    }
  };
  respuestaTienda.init({
    id_calificacion: DataTypes.INTEGER,
    id_tienda: DataTypes.INTEGER,
    id_producto : DataTypes.INTEGER,
    id_usuario_respuesta : DataTypes.INTEGER,
    respuesta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'respuestaTienda',
  });
  return respuestaTienda;
};