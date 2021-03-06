'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TiendaFeria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Feria, { foreignKey: 'idFeria' });
      this.belongsTo(models.Tienda, { foreignKey: 'idTienda'});
    }
  };
  TiendaFeria.init({
    idTienda: DataTypes.INTEGER,
    idFeria: DataTypes.INTEGER,
    urlVideo: DataTypes.STRING,
    estado: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'TiendaFeria',
  });
  return TiendaFeria;
};