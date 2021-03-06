'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Rol, {
        foreignKey: "IdRol"
      });

      this.hasMany(models.Favorito, {foreignKey: "IdUsuario"});

      

      this.hasMany(models.Pedido, {foreignKey: "IdUsuario"});

      

      //this.hasMany(models.Pedido, { foreignKey: "IdTienda" });

      this.belongsToMany(models.Tienda, {
        through: models.Pedido,
        foreignKey: "IdUsuario",
        otherKey: "IdTienda",
      });

      this.hasMany(models.UsuariosTienda, { foreignKey: "IdUsuario"} ); 

      this.belongsTo(models.Recurso, { foreignKey: "IdFoto", as: 'Foto'} );

    }
  };
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dni: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    direccion: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    esMayorista: DataTypes.BOOLEAN,
    IdRol: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdFoto: DataTypes.INTEGER,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    progreso: DataTypes.INTEGER,
    proveedor : DataTypes.STRING,
    socket : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};