'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Seccion, {
        foreignKey: "idSeccion"
      });
      
    }
  };
  Banner.init({
    nombre: DataTypes.STRING,
    url: DataTypes.STRING,
    idSeccion: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};