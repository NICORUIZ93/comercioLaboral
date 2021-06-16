const calificacionProductos = require("../db/models").calificacionProductos;
const Usuario = require("../db/models").Usuario;
const tienda = require("../db/models").Tienda;
const respuestaTienda = require("../db/models").respuestaTienda;
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;
const { malas_palabras } = require("../constants/filtroComentarios");
const TiendaProducto = require("../db/models").TiendaProducto;
const Producto = require("../db/models").Producto;
const comentariosProductos = require("../db/models").comentariosProductos;
const Pedido = require("../db/models").Pedido;
const axios = require("axios");
const service = {
  //ALTER TABLE "comentariosProductos" ADD COLUMN id SERIAL PRIMARY KEY;

  async calificacionProductos(nuevaCalificacion) {
    try {
      console.log(nuevaCalificacion);

      const usu = await Usuario.findAll({
        attributes: ["id", "nombre"],
        where: {
          id: nuevaCalificacion.IdUsuario,
        },
      });

      const pe = await Pedido.findAll({
        attributes: ["id"],
        where: {
          id: nuevaCalificacion.IdPedido,
        },
      });

      const verificar = await calificacionProductos.findAll({
        attributes: ["id"],
        where: {
          IdUsuario: nuevaCalificacion.IdUsuario,
          IdPedido: nuevaCalificacion.IdPedido,
        },
      });

      if (
        JSON.parse(JSON.stringify(usu))[0] != undefined &&
        JSON.parse(JSON.stringify(pe))[0] != undefined
      ) {
        if (JSON.parse(JSON.stringify(verificar))[0] == undefined) {
          let resultadocreate = await calificacionProductos.create(
            nuevaCalificacion
          );
          return resultadocreate;
        } else {
          return "Usted ya califico este producto";
        }
      } else {
        return "Usuario o Producto no existen";
      }
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerCalificacionesProducto(params) {
    try {
      const calificaciones = await calificacionProductos.findAll({
        where: {
          IdPedido: params,
        },
        order: [["createdAt", "DESC"]],
      });
      let cl = JSON.parse(JSON.stringify(calificaciones));
      let resul = [];
      for (let i = 0; i <= cl.length - 1; i++) {
        const usu = await Usuario.findAll({
          attributes: ["nombre"],
          where: {
            id: cl[i]["IdUsuario"],
          },
        });

        resul[i] = {
          id: cl[i]["id"],
          id_pedido: cl[i]["IdPedido"],
          usuario: usu[0],
          calificacion: cl[i]["calificacion"],
          createdAt: cl[i]["createdAt"],
          updatedAt: cl[i]["updatedAt"],
        };
      }

      console.log(resul);
      return resul;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerComentariosProducto(params) {
    try {
      const comentarios = await comentariosProductos.findAll({
        where: {
          [Op.or]: params,
        },
        order: [["createdAt", "DESC"]],
      });
      let cl = JSON.parse(JSON.stringify(comentarios));
      let resul = [];
      for (let i = 0; i <= cl.length - 1; i++) {
        const usu = await Usuario.findAll({
          attributes: ["nombre"],
          where: {
            id: cl[i]["IdUsuario"],
          },
        });

        const respuesta = await respuestaTienda.findAll({
          where: {
            id_calificacion: cl[i]["id"],
          },
        });

        resul[i] = {
          id: cl[i]["id"],
          id_producto: cl[i]["IdProducto"],
          usuario: usu[0],
          comentario: cl[i]["comentario"],
          respuesta: JSON.parse(JSON.stringify(respuesta)),
          createdAt: cl[i]["createdAt"],
          updatedAt: cl[i]["updatedAt"],
        };
      }

      console.log(resul);
      return resul;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerPromedioProducto(params) {
    try {
      const calificaciones = await calificacionProductos.findAll({
        attributes: [
          [
            sequelize.fn("AVG", sequelize.col("calificacion")),
            "promedio_calificacion",
          ],
        ],
        where: {
          [Op.or]: params,
        },
      });

      return calificaciones;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearComentarioProducto(req) {
    try {
      const usu = await Usuario.findAll({
        attributes: ["id", "nombre"],
        where: {
          id: req.body.IdUsuario,
        },
      });

      const pro = await Producto.findAll({
        attributes: ["id"],
        where: {
          id: req.body.IdProducto,
        },
      });

      const verificar = await comentariosProductos.findAll({
        attributes: ["id"],
        where: {
          IdUsuario: req.body.IdUsuario,
          IdProducto: req.body.IdProducto,
        },
      });

      if (
        JSON.parse(JSON.stringify(usu))[0] != undefined &&
        JSON.parse(JSON.stringify(pro))[0] != undefined
      ) {
        if (JSON.parse(JSON.stringify(verificar))[0] == undefined) {
          const create = await comentariosProductos.create(req.body);
          return create;
        } else {
          return "Usted ya comentó este producto";
        }
      } else {
        return "Usuario o Producto no existen";
      }
    } catch (error) {
      return error;
    }
  },
  async obtenerComentariosEstado(req) {
    try {
      const tiendaProducto = await TiendaProducto.findAll({
        where: {
          IdTienda: req.params.id,
        },
      });
      console.log(tiendaProducto);
      let respondidos = [];
      let sinresponder = [];
      for (
        let i = 0;
        i < JSON.parse(JSON.stringify(tiendaProducto)).length;
        i++
      ) {
        const res = await respuestaTienda.findAll({
          where: {
            id_producto: JSON.parse(JSON.stringify(tiendaProducto))[i][
              "IdProducto"
            ],
          },
        });

        const comentarios = await calificacionProductos.findAll({
          where: {
            IdProducto: JSON.parse(JSON.stringify(tiendaProducto))[i][
              "IdProducto"
            ],
          },
        });

        console.log(JSON.parse(JSON.stringify(res)));
        console.log(JSON.parse(JSON.stringify(comentarios)));

        respondidos[i] = JSON.parse(JSON.stringify(res));
        sinresponder[i] = JSON.parse(JSON.stringify(comentarios));
      }

      return {
        respondidos: respondidos,
        sinresponder: sinresponder,
      };
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.calificacionProductos = service;
