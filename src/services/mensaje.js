const Mensaje = require("../db/models").Mensaje;
var sequelize = require("../db/models").sequelize;
const { Op } = require("sequelize");

const service = {
  async obtenerMensajesPorTienda(idTienda) {
    try {
      const mensajes = await Mensaje.findAll({
        where: { IdTienda: idTienda, IdMensaje: { [Op.is]: null } },
        include: [
          {
            model: Mensaje,
            as: "SubMensajes",
            include: [{ model: Mensaje, as: "SubMensajes" }],
          },
        ],
      });

      return mensajes;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerMensajesPorProducto(idProducto) {
    try {
      const mensajes = await Mensaje.findAll({
        where: { IdProducto: idProducto, IdMensaje: { [Op.is]: null } },
        include: [
          {
            model: Mensaje,
            as: "SubMensajes",
            include: [{ model: Mensaje, as: "SubMensajes" }],
          },
        ],
      });

      return mensajes;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerMensajesPorId(id) {
    try {
      const mensajes = await Mensaje.findByPk(id, {
        include: [
          {
            model: Mensaje,
            as: "SubMensajes",
            include: [{ model: Mensaje, as: "SubMensajes" }],
          },
        ],
      });

      return mensajes;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearMensaje(nuevoMensaje) {
    try {
      let resultadocreate = await Mensaje.create(nuevoMensaje);

      if (resultadocreate.IdMensaje) {
        resultadocreate = await this.obtenerMensajesPorId(
          resultadocreate.IdMensaje
        );
      }

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarMensaje(idMensaje) {
    try {
      const resultadoDestroy = await Mensaje.destroy({
        where: {
          id: idMensaje,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.mensajeService = service;
