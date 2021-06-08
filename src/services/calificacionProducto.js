const calificacionProductos = require("../db/models").calificacionProductos;
const Usuario = require("../db/models").Usuario;
const tienda = require('../db/models').Tienda;
const respuestaTienda = require('../db/models').respuestaTienda
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;
const { malas_palabras } = require('../constants/filtroComentarios')
const TiendaProducto = require('../db/models').TiendaProducto;
const Producto = require('../db/models').Producto;
const axios = require('axios');
const service = {


  async calificacionProductos(nuevaCalificacion) {
    try {

      const usu = await Usuario.findAll({
        attributes: ['id', 'nombre'],
        where: {
          'id': nuevaCalificacion.IdUsuario,
        }
      });

      const pro = await Producto.findAll({
        attributes: ['id'],
        where: {
          'id': nuevaCalificacion.IdProducto,
        }
      });

      const verificar = await calificacionProductos.findAll({
        attributes: ['id'],
        where: {
          'IdUsuario': nuevaCalificacion.IdUsuario,
          'IdProducto': nuevaCalificacion.IdProducto
        }
      });
    
      if ((JSON.parse(JSON.stringify(usu)))[0] != undefined && (JSON.parse(JSON.stringify(pro)))[0] != undefined) {

        if ((JSON.parse(JSON.stringify(verificar)))[0] == undefined) {
          let resultadocreate = await calificacionProductos.create(
            nuevaCalificacion
          );
          return resultadocreate  
        }else{
          return "Usted ya califico este producto"
        }

      }else{
        return "Usuario o Producto no existen"
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
          attributes: ['nombre'],
          where: {
            'id': cl[i]['IdUsuario'],
          }
        });

          resul[i] = {
            id: cl[i]['id'],
            id_producto: cl[i]['IdProducto'],
            usuario: usu[0],
            calificacion: cl[i]['calificacion'],
            createdAt: cl[i]['createdAt'],
            updatedAt: cl[i]['updatedAt']
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
         
       
         
         console.log(JSON.parse(JSON.stringify(res)))
         console.log(JSON.parse(JSON.stringify(comentarios)))
        
         respondidos[i] =  JSON.parse(JSON.stringify(res))
         sinresponder[i] = JSON.parse(JSON.stringify(comentarios))
        
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
