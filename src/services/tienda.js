const Tienda = require("../db/models").Tienda;
const UsuariosTienda = require("../db/models").UsuariosTienda;
var sequelize = require("../db/models").sequelize;

const service = {
  async obtenerTiendas() {
    try {
      const tiendas = await Tienda.findAll({ raw: false });

      return tiendas;
    } catch (error) {
      return `Error ${error}`;
    }
  },

  async obtenerTienda(idTienda) {
    try {
      const tienda = (await Tienda.findByPk(idTienda)).get({ plain: true });

      return tienda;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerTiendaPorUsuario(idUsuario) {
    try {
      const tienda = await UsuariosTienda.findOne({ where: { IdUsuario: idUsuario, esAdministrador: true }, include:[Tienda] });

      if(!tienda) throw Error('No existen tiendas asociadas a el usuario');
      return tienda.Tienda;

    } catch (error) {
      return `${error}`;
    }
  },
  async crearTienda(idUsuario, nuevaTienda, esAdministrador = false) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const resultadocreate = await Tienda.create(nuevaTienda, {
          transaction: t,
        });

        await UsuariosTienda.create(
          {
            IdUsuario: idUsuario,
            IdTienda: resultadocreate.id,
            esAdministrador,
          },
          { transaction: t }
        );

        return resultadocreate;
      });

      return result;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarTienda(tienda) {
    try {
      const resultadoUpdate = await Tienda.update(tienda, {
        where: {
          id: tienda.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarTienda(idTienda) {
    try {
      const resultadoDestroy = await Tienda.destroy({
        where: {
          id: idTienda,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      return `Error ${error}`;
    }
  },
};

module.exports.tiendaService = service;
