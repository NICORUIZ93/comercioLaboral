const Feria = require("../db/models").Feria;
const TiendaFeria = require("../db/models").TiendaFeria;
const { productoService } = require("./producto");


const service = {
  async obtenerFerias() {
    try {
      const ciudades = await Feria.findAll();

      return ciudades;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearFeria(nuevoFeria) {
    try {
      let resultadocreate = await Feria.create(nuevoFeria);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async asociarTiendasAFeria(tiendas) {
    try {

      let resultadocreate = await TiendaFeria.bulkCreate(tiendas);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async cargarFeria(productos) {
    try {

      for (producto of productos) {
        await productoService.actualizarProductoPorId({ feria: true, valorFeria: producto.valor }, producto.id);
      }

      return true;
      
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeria(idFeria) {
    try {
      const Feria = (
        await Feria.findByPk(idFeria)
      ).get({ plain: true });

      return Feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarFeria(Feria) {
    try {
      const resultadoUpdate = await Feria.update(Feria, {
        where: {
          id: Feria.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarFeria(idFeria) {
    try {
      const resultadoDestroy = await Feria.destroy({
        where: {
          id: idFeria,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.FeriaService = service;
