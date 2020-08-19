const Tienda = require("../db/models").Tienda;
const TiendaRecursos = require("../db/models").TiendaRecurso;

const service = {
  async obtenerTiendas() {
    try {

      const tiendas = await Tienda.findAll({ raw: false } );

      return tiendas;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async obtenerTienda(idTienda) {
    try {

      const tienda = (await Tienda.findByPk(idTienda)).get({plain:true});

      return tienda;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async crearTienda(nuevaTienda) {
    try {
             
      const resultadocreate = (await Tienda.create(nuevaTienda)).get({plain:true});

      return resultadocreate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarTienda(tienda) {
    try {
             
    const resultadoUpdate = (await Tienda.update(tienda, {
        where: {
          id: tienda.id
        }
      }));

      return resultadoUpdate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarTienda(idTienda) {
    try {
             
    const resultadoDestroy = (await Tienda.destroy({
        where: {
          id: idTienda
        }
      }));

      return resultadoDestroy;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  
}

module.exports.tiendaService = service;