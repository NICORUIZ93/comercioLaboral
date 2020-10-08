const Banner = require("../db/models").Banner;

const service = {
  async obtenerBanners() {
    try {
      const ciudades = await Banner.findAll();

      return ciudades;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearBanner(nuevoBanner) {
    try {
      let resultadocreate = await Banner.create(nuevoBanner);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerBanner(idBanner) {
    try {
      const banner = (
        await Banner.findByPk(idBanner)
      ).get({ plain: true });

      return banner;
    } catch (error) {
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.bannerService = service;
