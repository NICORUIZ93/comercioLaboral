const Feria = require("../db/models").Feria;
const Tienda = require("../db/models").Tienda;
const Recurso = require("../db/models").Recurso;
const TiendaFeria = require("../db/models").TiendaFeria;
const { productoService } = require("./producto");
const notificacionService = require("./notificaciones");
const _temasNotificacion = require("../constants/temasNotificacion");
var sequelize = require("../db/models").sequelize;
const { Op } = require("sequelize");

const service = {
  async obtenerFerias() {
    try {
      const ferias = await Feria.findAll();

      return ferias;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearFeria(nuevaFeria) {
    try {
      nuevaFeria.activa = false;
      let resultadocreate = await Feria.create(nuevaFeria);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async asociarTiendasAFeria(tiendas) {
    try {
      let resultadocreate = await TiendaFeria.bulkCreate(tiendas.tiendas);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async cargarFeria(productos, urlVideo, idTienda) {
    try {
      for (producto of productos) {
        await productoService.actualizarProductoPorId(
          { feria: true, valorFeria: producto.valor },
          producto.id
        );
      }
      if (urlVideo) {
        await TiendaFeria.update(
          { urlVideo: urlVideo },
          {
            where: {
              idTienda: idTienda,
            },
          }
        );
      }

      return true;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeria(idFeria) {
    try {
      let feria = (await Feria.findByPk(idFeria, {})).get({ plain: true });

      const tiendaFeria = await TiendaFeria.findAll({
        where: {
          idFeria: feria.id,
        },
        include: [
          {
            model: Tienda,
            attributes: [
              "id",
              "nombre",
              "direccion",
              "telefono",
              "descripcion",
            ],
            include: [
              {
                model: Recurso,
                as: "Recursos",
                attributes: [
                  "id",
                  "nombre",
                  "key",
                  "url",
                  "extension",
                  "url",
                  "prioridad",
                ],
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
        attributes: ["idTienda", "urlVideo"],
      });

      feria.tiendas = tiendaFeria.map((tiendaf) => {
        let tienda = tiendaf.Tienda;
        tienda.video = tiendaf.urlVideo;
        return tienda;
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeriaActiva() {
    try {
      let feria = (
        await Feria.findOne({
          where: {
            activa: true,
          },
        })
      ).get({ plain: true });

      const tiendaFeria = await TiendaFeria.findAll({
        where: {
          idFeria: feria.id,
        },
        include: [
          {
            model: Tienda,
            attributes: [
              "id",
              "nombre",
              "direccion",
              "telefono",
              "descripcion",
            ],
            include: [
              {
                model: Recurso,
                as: "Recursos",
                attributes: [
                  "id",
                  "nombre",
                  "key",
                  "url",
                  "extension",
                  "url",
                  "prioridad",
                ],
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
        attributes: ["idTienda", "urlVideo"],
      });

      feria.tiendas = tiendaFeria.map((tiendaf) => {
        let tienda = tiendaf.Tienda;
        tienda.video = tiendaf.urlVideo;
        return tienda;
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeriaPorParametros(parametrosWhere) {
    try {
      const feria = await Feria.findOne({
        where: {
          [Op.or]: parametrosWhere,
        },
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeriaPorFecha(campo, fecha) {
    try {
      const feria = await Feria.findOne({
        where: sequelize.where(
          sequelize.fn("date", sequelize.col(campo)),
          "=",
          fecha
        ),
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarFeria(feria, id) {
    try {
      const resultadoUpdate = await Feria.update(feria, {
        where: {
          id: id,
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
  async enviarNotificacion() {
    try {
      const fechaActual = new Date().toISOString().replace(/\T.+/, "");

      let feria = await this.obtenerFeriaPorFecha("fechaInicio", fechaActual);
      if (feria) {
        await notifcar(_temasNotificacion.InicioFeria);
        if (!feria.activa)
          await this.actualizarFeria({ activa: true }, feria.id);
        return;
      }

      feria = await this.obtenerFeriaPorFecha("fechaFin", fechaActual);

      if (feria) {
        await notifcar(_temasNotificacion.FinFeria);
        if (feria.activa) {
          await this.actualizarFeria({ activa: false }, feria.id);
          await productoService.actualizarProductoPorParametros(
            { feria: false },
            { feria: true }
          );
        }
        return;
      }
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

//privados
const notifcar = async (tema) => {
  try {
    const notificacion = await notificacionService.obtenerNotificacionPorParametros(
      [{ tema: tema }]
    );

    if (notificacion) {
      return;
    } else {
      await new notificacionService().enviarNotificacion(tema, {}, "moviles");
    }
  } catch (error) {
    throw error;
  }
};
module.exports.feriaService = service;
