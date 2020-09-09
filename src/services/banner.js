const Banner = require("../db/models").Banner;

const service = {
  async obtenerBanners() {
    try {
      const ciudades = await Banner.findAll();

      return ciudades;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearBanner(nuevoBanner) {
    try {
      let resultadocreate = await Banner.create(nuevoBanner);

      return resultadocreate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerBanner(idBanner) {
    try {
      const banner = (
        await Banner.findByPk(idBanner)
      ).get({ plain: true });

      return banner;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarBanner(banner) {
    try {
      const resultadoUpdate = await Banner.update(banner, {
        where: {
          id: banner.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarBanner(idBanner) {
    try {
      const resultadoDestroy = await Banner.destroy({
        where: {
          id: idBanner,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      return `Error ${error}`;
    }
  },
};

module.exports.bannerService = service;
