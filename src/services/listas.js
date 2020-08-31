const Ciudad = require("../db/models").Ciudad;
var sequelize = require("../db/models").sequelize;
const { Op } = require("sequelize");

const service = {
  async obtenerListas() {
    try {
      const ciudades = await Ciudad.findAll({
        where: { IdTienda: idTienda, IdMensaje: { [Op.is]: null } },
        include: [{ model: Mensaje, as: "Subciudades" }],
      });

      return ciudades;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerLista(idLista) {
    try {
      const ciudades = await Ciudad.findAll({ attributes: ["id", "departamento", "municipio"]});
      return ciudades;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearLista(nuevoMensaje) {
    try {
      let resultadocreate = await Mensaje.create(nuevoMensaje);

      if (resultadocreate.IdMensaje) {
        resultadocreate = await this.obtenerciudadesPorId(
          resultadocreate.IdMensaje
        );
      }

      return resultadocreate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarLista(idMensaje) {
    try {
      const resultadoDestroy = await Mensaje.destroy({
        where: {
          id: idMensaje,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      return `Error ${error}`;
    }
  },
};

module.exports.listasService = service;
