const bannerMovil = require("../db/models").bannerMovil;
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;

const service = {
  async obtenerBannerMovil() {
    try {
      const Bmobil = await bannerMovil.findAll();
      return Bmobil;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerCalificacionPorTienda(params) {
    try {
      const itemsMovil = await bannerMovil.findAll({
        where: {
          [Op.or]: params,
        },
      });

      return itemsMovil;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearCalificacionTienda(nuevaBannerMovil) {
    try {
      let resultadocreate = await bannerMovil.create(nuevaBannerMovil);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerCalificacionTienda(idBannerMovil) {
    try {
      const CalificacionTienda = (
        await bannerMovil.findByPk(idBannerMovil)
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

module.exports.bannerMovilService = service;
