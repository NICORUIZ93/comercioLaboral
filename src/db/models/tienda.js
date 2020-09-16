'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tienda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Producto, {
        through: models.TiendaProducto,
        foreignKey: "IdTienda",
        otherKey: "IdProducto",
      });

      this.belongsToMany(models.Recurso, {
        through: models.TiendaRecurso,
        foreignKey: "IdTienda",
        otherKey: "IdRecurso",
      });

      //this.hasMany(models.Usuario, { foreignKey: "IdTienda" });
      this.hasMany(models.CalificacionTienda, {foreignKey: "IdTienda"});

      this.hasMany(models.Pedido, { foreignKey: "IdTienda" });

      this.belongsToMany(models.Usuario, {
        through: models.Pedido,
        foreignKey: "IdTienda",
        otherKey: "IdUsuario",
      });

      this.hasMany(models.UsuariosTienda, { foreignKey: "IdTienda"} ); 

      this.belongsTo(models.Ciudad, {
        foreignKey: "idCiudad"
      });

      this.belongsTo(models.Departamento, {
        foreignKey: "idDepartamento"
      });
    }
  };
  Tienda.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    banco: DataTypes.STRING,
    numeroCuenta: DataTypes.STRING,
    tipoCuenta: DataTypes.STRING,
    maxFotos: DataTypes.INTEGER,
    calificacion: DataTypes.DECIMAL,
    idDepartamento: DataTypes.INTEGER,
    idCiudad: DataTypes.INTEGER,
    tipoTienda: DataTypes.STRING,
    porcentajeComision: DataTypes.DECIMAL,
    codigoMP: DataTypes.STRING,
    tokenMP: DataTypes.STRING,
    estado: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Tienda',
  });
  return Tienda;
};