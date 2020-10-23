const admin = require("firebase-admin");
const Notificacion = require("../db/models").Notificacion;
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

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
}

module.exports = NotificacionService;
