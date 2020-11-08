'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Tienda, {
        through: models.TiendaFeria,
        foreignKey: "idFeria",
        otherKey: "idTienda",
      });

      /*
      this.belongsToMany(models.Producto, {
        through: models.Feriaproductos,
        foreignKey: "idTienda",
        otherKey: "idProducto"
      });
*/
      this.hasMany(models.Feriaproductos, { foreignKey: "idFeria" });

    }
  };
  Feria.init({
    nombre: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    descripcion: DataTypes.TEXT,
    activa: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Feria',
  });
  return Feria;
};