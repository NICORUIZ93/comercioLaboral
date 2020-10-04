const TiendaProducto = require("../db/models").TiendaProducto;
const { Op } = require("sequelize");

const service = {
  async obtenerTiendaProductos() {
    try {
      const ciudades = await TiendaProducto.findAll();

      return ciudades;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerTiendaProductosPorParametros(parametrosWhere) {
    try {
      const tiendaProductos = await TiendaProducto.findAll({
        where: {
          [Op.and]: parametrosWhere,
        }
      });

      return tiendaProductos;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearTiendaProducto(nuevoTiendaProducto) {
    try {
      let resultadocreate = await TiendaProducto.create(nuevoTiendaProducto);

      return resultadocreate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerTiendaProducto(idTiendaProducto) {
    try {
      const TiendaProducto = (
        await TiendaProducto.findByPk(idTiendaProducto)
      ).get({ plain: true });

      return TiendaProducto;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarTiendaProducto(datos, parametrosWhere) {
    try {
      const resultadoUpdate = await TiendaProducto.update(datos, {
        where: parametrosWhere,
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarTiendaProducto(idTiendaProducto) {
    try {
      const resultadoDestroy = await TiendaProducto.destroy({
        where: {
          id: idTiendaProducto,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      return `Error ${error}`;
    }
  },
};

module.exports.tiendaProductoService = service;
