const Seccion = require("../db/models").Seccion;

const service = {
  async obtenerSecciones() {
    try {
      const ciudades = await Seccion.findAll();

      return ciudades;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearSeccion(nuevoSeccion) {
    try {
      let resultadocreate = await Seccion.create(nuevoSeccion);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerSeccion(idSeccion) {
    try {
      const Seccion = (
        await Seccion.findByPk(idSeccion)
      ).get({ plain: true });

      return Seccion;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarSeccion(Seccion) {
    try {
      const resultadoUpdate = await Seccion.update(Seccion, {
        where: {
          id: Seccion.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarSeccion(idSeccion) {
    try {
      const resultadoDestroy = await Seccion.destroy({
        where: {
          id: idSeccion,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.seccionService = service;
