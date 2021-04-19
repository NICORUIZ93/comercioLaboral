const calificacionProductos = require("../db/models").calificacionProductos;
const Usuario = require("../db/models").Usuario;
const tienda = require('../db/models').Tienda;
const respuestaTienda = require('../db/models').respuestaTienda
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;

const service = {
    
    
    async calificacionProductos(nuevaCalificacion) {
      try {
        const usu = await Usuario.findAll({
          attributes: ['id','nombre'],
          where: {
            'id': nuevaCalificacion.IdUsuario,
          }
        });
        let resultadocreate = "";
        if ((JSON.parse(JSON.stringify(usu)))[0] != undefined) {
           resultadocreate = await calificacionProductos.create(
            nuevaCalificacion
          );
        }else {
            resultadocreate = "No existe el usuario"
        }
    
  
        return resultadocreate;
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
        for (let i = 0; i <= cl.length-1; i++) {
          const usu = await Usuario.findAll({
            attributes: ['id','nombre'],
            where: {
              'id': cl[i]['IdUsuario'],
            }
          });

          const respuesta = await respuestaTienda.findAll({
            where: {
              'id_calificacion': cl[i]['id'],
            }
          });

          

          console.log(respuesta)
          resul[i] = {
            id : cl[i]['id'],
            id_producto : cl[i]['IdProducto'],
            usuario : (JSON.parse(JSON.stringify(usu)))[i]['nombre'],
            calificacion : cl[i]['calificacion'],
            comentario : cl[i]['comentario'],
            respuestas : { "datos" : JSON.parse(JSON.stringify(respuesta))},
            createdAt : cl[i]['createdAt'],
            updatedAt : cl[i]['updatedAt']
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
    }
   
  };
  
module.exports.calificacionProductos = service;
