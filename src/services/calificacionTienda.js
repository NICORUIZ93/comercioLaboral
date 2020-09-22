const CalificacionTienda = require("../db/models").CalificacionTienda;
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;

const service = {
  async obtenerCalificacionTiendas() {
    try {
      const ciudades = await CalificacionTienda.findAll();

      return ciudades;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerCalificacionPorTienda(params) {
    try {
      const calificaciones = await CalificacionTienda.findAll({
        where: {
          [Op.or]: params,
        }
      });

      return calificaciones;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearCalificacionTienda(nuevaCalificacionTienda) {
    try {
      let resultadocreate = await CalificacionTienda.create(
        nuevaCalificacionTienda
      );

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerCalificacionTienda(idCalificacionTienda) {
    try {
      const CalificacionTienda = (
        await CalificacionTienda.findByPk(idCalificacionTienda)
      ).get({ plain: true });

      return CalificacionTienda;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarCalificacionTienda(CalificacionTienda) {
    try {
      const resultadoUpdate = await CalificacionTienda.update(
        CalificacionTienda,
        {
          where: {
            id: CalificacionTienda.id,
          },
        }
      );

      return resultadoUpdate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarCalificacionTienda(idCalificacionTienda) {
    try {
      const resultadoDestroy = await CalificacionTienda.destroy({
        where: {
          id: idCalificacionTienda,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.CalificacionTiendaService = service;
