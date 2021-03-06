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

      

      this.belongsToMany(models.Pedido, {
        through: models.DetallePedido,
        foreignKey: "IdProducto",
        otherKey: "IdPedido",
      });
      
      

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

      /*
      this.belongsToMany(models.Feria, {
        through: models.Feriaproductos,
        foreignKey: "idProducto",
        otherKey: "idTienda",
        as: 'Feria'
      });
*/
      this.hasMany(models.Feriaproductos, { foreignKey: "idProducto" });
    }
  };
  Producto.init({
    nombre: DataTypes.STRING,
    IdCategoria: DataTypes.INTEGER,
    descripcion: DataTypes.TEXT,
    valor: DataTypes.DECIMAL,
    cantidad: DataTypes.INTEGER,
    maxFotos: DataTypes.INTEGER,
    oferta: DataTypes.BOOLEAN,
    valorOferta: DataTypes.DECIMAL,
    calificacion: DataTypes.DECIMAL,
    porMayor: DataTypes.BOOLEAN,
    valorPorMayor: DataTypes.DECIMAL,
    tags: DataTypes.TEXT,
    caracteristicas: DataTypes.TEXT,
    estado: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    feria: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    valorFeria: DataTypes.DECIMAL,
    frecuencia : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};