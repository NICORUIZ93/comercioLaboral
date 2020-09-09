const Seccion = require("../db/models").Seccion;

const service = {
  async obtenerSecciones() {
    try {
      const ciudades = await Seccion.findAll();

      return ciudades;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearSeccion(nuevoSeccion) {
    try {
      let resultadocreate = await Seccion.create(nuevoSeccion);

      return resultadocreate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerSeccion(idSeccion) {
    try {
      const Seccion = (
        await Seccion.findByPk(idSeccion)
      ).get({ plain: true });

      return Seccion;
    } catch (error) {
      return `Error ${error}`;
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
      return `Error ${error}`;
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
      return `Error ${error}`;
    }
  },
};

module.exports.seccionService = service;
