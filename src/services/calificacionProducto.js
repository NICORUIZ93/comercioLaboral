const calificacionProductos = require("../db/models").calificacionProductos;
const Usuario = require("../db/models").Usuario;
const tienda = require('../db/models').Tienda;
const respuestaTienda = require('../db/models').respuestaTienda
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;
const { malas_palabras } = require('../constants/filtroComentarios')
const TiendaProducto = require('../db/models').TiendaProducto
const axios = require('axios');
const service = {


  async calificacionProductos(nuevaCalificacion) {
    try {
      var grocerias = malas_palabras
      for (var i = 0; i < grocerias.length; i++) {
        regex = new RegExp("(^|\\s)" + grocerias[i] + "($|(?=\\s))", "gi")
        nuevaCalificacion.comentario = nuevaCalificacion.comentario.replace(regex, function ($0, $1) { return $1 + "comerzio" });
      }

      var regex = /(\d+)/g;
      let filtroNum = parseInt(nuevaCalificacion.comentario.match(regex));

      if (filtroNum > 99) {
        return "Comentario bloqueado"
      } else if (filtroNum <= 99 || filtroNum == null) {
        const usu = await Usuario.findAll({
          attributes: ['id', 'nombre'],
          where: {
            'id': nuevaCalificacion.IdUsuario,
          }
        });
        let resultadocreate = "";
        if ((JSON.parse(JSON.stringify(usu)))[0] != undefined) {
          resultadocreate = await calificacionProductos.create(
            nuevaCalificacion
          );
        } else {
          resultadocreate = "No existe el usuario"
        }


        return resultadocreate;
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
          [Op.or]: params,
        },
        order: [
          ['createdAt', 'DESC']
        ]
      });
      let cl = JSON.parse(JSON.stringify(calificaciones))
      let resul = [];
      for (let i = 0; i <= cl.length - 1; i++) {
        const usu = await Usuario.findAll({
          attributes: ['id', 'nombre'],
          where: {
            'id': cl[i]['IdUsuario'],
          }
        });

        const respuesta = await respuestaTienda.findAll({
          where: {
            'id_calificacion': cl[i]['id'],
          }
        });

        if ((JSON.parse(JSON.stringify(usu)))[i] != undefined) {
          console.log(respuesta)
          resul[i] = {
            id: cl[i]['id'],
            id_producto: cl[i]['IdProducto'],
            usuario: (JSON.parse(JSON.stringify(usu)))[i]['nombre'],
            calificacion: cl[i]['calificacion'],
            comentario: cl[i]['comentario'],
            respuestas: { "datos": JSON.parse(JSON.stringify(respuesta)) },
            createdAt: cl[i]['createdAt'],
            updatedAt: cl[i]['updatedAt']
          }
        } else {
          console.log(respuesta)
          resul[i] = {
            id: cl[i]['id'],
            id_producto: cl[i]['IdProducto'],
            usuario: "",
            calificacion: cl[i]['calificacion'],
            comentario: cl[i]['comentario'],
            respuestas: { "datos": JSON.parse(JSON.stringify(respuesta)) },
            createdAt: cl[i]['createdAt'],
            updatedAt: cl[i]['updatedAt']
          }
        }



      }

      console.log(resul)
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
          [sequelize.fn('AVG', sequelize.col('calificacion')), 'promedio_calificacion'],
        ], where: {
          [Op.or]: params,
        }

      });

      return calificaciones;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerComentariosEstado(req) {
    try {
      const tiendaProducto = await TiendaProducto.findAll({
        where: {
          'IdTienda': req.params.id
        }
      });
      console.log(tiendaProducto)
      let respondidos = [];
      let sinresponder = [];
      for (let i = 0; i < (JSON.parse(JSON.stringify(tiendaProducto))).length; i++) {
        const res = await respuestaTienda.findAll({
          where : {
            'id_producto' : (JSON.parse(JSON.stringify(tiendaProducto)))[i]['IdProducto']
          }
        })

        const comentarios = await calificacionProductos.findAll({ 
          where: {
            'IdProducto' : (JSON.parse(JSON.stringify(tiendaProducto)))[i]['IdProducto']
          }
         });

         respondidos[i] =  JSON.parse(res)
         sinresponder[i] = JSON.parse(comentarios)
        
      }
      
      return {
        "respondidos" : respondidos,
        "sinresponder": sinresponder
      }


    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

};

module.exports.calificacionProductos = service;
