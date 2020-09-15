'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {

    static associate(models) {
  
      this.hasMany(models.DetallePedido, { foreignKey: "IdProducto" });

      this.belongsTo(models.Categoria, {
        foreignKey: "IdCategoria"
      });

      this.belongsToMany(models.Usuario, {
        through: models.Favorito,
        foreignKey: "IdProducto",
        otherKey: "IdUsuario",
      });

      this.belongsToMany(models.Pedido, {
        through: models.DetallePedido,
        foreignKey: "IdProducto",
        otherKey: "IdPedido",
      });
      
      this.hasMany(models.CalificacionProducto, {foreignKey: "IdProducto"});

      this.belongsToMany(models.Tienda, {
        through: models.TiendaProducto,
        foreignKey: "IdProducto",
        otherKey: "IdTienda",
      });

      this.belongsToMany(models.Recurso, {
        through: models.ProductoRecurso,
        foreignKey: "IdProducto",
        otherKey: "IdRecurso",
      });

    }
  };
  Producto.init({
    nombre: DataTypes.STRING,
    IdCategoria: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    cantidad: DataTypes.INTEGER,
    maxFotos: DataTypes.INTEGER,
    oferta: DataTypes.BOOLEAN,
    valorOferta: DataTypes.DECIMAL,
    calificacion: DataTypes.DECIMAL,
    estado: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};