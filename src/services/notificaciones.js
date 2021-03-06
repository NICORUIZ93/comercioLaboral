const admin = require("firebase-admin");
const Notificacion = require("../db/models").Notificacion;
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const Pedido = require("../db/models").Pedido;
const Producto = require("../db/models").Producto;
const TiendaProducto = require('../db/models').TiendaProducto;
const axios = require('axios')

class NotificacionService {
  constructor() {
    try {
      if (admin.apps.length === 0) {
        var serviceAccount = require(process.env
          .GOOGLE_APPLICATION_CREDENTIALS);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://lamejorferia-32065.firebaseio.com",
        });
      }
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  static async obtenerNotificaciones(id) {
    try {
      const notificaciones = await Notificacion.findAll();

      return notificaciones;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  static async obtenerNotificacionPorParametros(parametrosWhere) {
    try {
      const notificacion = await Notificacion.findOne({
        where: {
          [Op.or]: parametrosWhere,
        },
      });

      return notificacion;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  async enviarNotificacion(tema, data, topic = "todos") {
    try {
      const uuidNotificacion = uuidv4();

      await Notificacion.create({
        tema: tema,
        guid: uuidNotificacion,
        recibida: false,
      });

      const datosSerialized = JSON.stringify({ data });

      var message = {
        data: {
          uuid: uuidNotificacion,
          datos: datosSerialized,
        },
        topic: topic,
      };

      const response = await admin.messaging().send(message);
      console.log("repuesta del mensaje: " + response);
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  static async confirmarNotificacion(uuid) {
    try {
      const resultadoUpdate = await Notificacion.update(
        { recibida: true },
        {
          where: {
            uuid: uuid,
          },
        }
      );

      return resultadoUpdate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
  static async notificacionTienda(req) {
    try {
      const pedidos = await Pedido.findAll({
        where : {
            'IdTienda' : req.params.IdTienda,
            'confirmado' : true
        },
        limit:1,
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const tiendaproducto = await TiendaProducto.findAll({
         attributes: ['IdProducto'],
         where: {
            'IdTienda' : req.params.IdTienda,
            'stock' :{
              [Op.lte]: 5
            } 
         }
      })
      let tp = JSON.parse(JSON.stringify(tiendaproducto))
      let producto = [];
      var i =0;
      for (const key in tp) {
         let peticion = await axios.get(`https://secure-atoll-67302.herokuapp.com/api/producto/${tp[key]['IdProducto']}`)
         producto[i] = peticion.data
        i++;  
      }

      let resultado = {
          "Nuevo pedido" : pedidos,
          "Stock bajo" : producto
      }



      return resultado;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
  static async notificacionUsuario(req) {
    try {
      let productos_promocion = await Producto.findAll({
        where : {
           'oferta' : true
        },
        limit : 10,
        order: [
          ['createdAt', 'DESC']
        ]
      })

      let productos_nuevos = await Producto.findAll({
        limit : 10,
        order: [
          ['createdAt', 'DESC']
        ]
      })

      let ultimo_pedido = await Pedido.findAll({
        attributes: ['IdTienda'],
        where : {
          'IdUsuario' : req.params.IdUsuario
        },
        limit : 1,
        order: [
          ['createdAt', 'DESC']
        ]
      })
      let ultima_tienda = JSON.parse(JSON.stringify(ultimo_pedido))
      let peticion = await axios.get(`https://secure-atoll-67302.herokuapp.com/api/productos/tienda/${ultima_tienda[0]['IdTienda']}`)
      
      
      let resul = {
         "Nuevas promociones" : productos_promocion,
         "Productos nuevos" : productos_nuevos,
         "Novedades tienda ultima compra" : peticion.data
      }
      return resul
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
}



// TIENDA : ID NUEVOS PEDIDOS , STOCK , NOVEDADES DE LA PLATAFORMA 
// USUARIO : ID NUEVA PROMOCIONES , NUEVOS PRODUCTOS , PEDIDOS EXITOSO , NOVEDADES DE LA TIENDA 
module.exports = NotificacionService;
