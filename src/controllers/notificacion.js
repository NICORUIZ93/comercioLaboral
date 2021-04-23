const notificacionService = require( "../services/notificaciones");

module.exports = {


  async obtenerNotificacion(req, res) {
    try {
      const idNotificacion = req.params.id;
      const notificacion = await notificacionService.obtenerNotificacionPorParametros({ id: idNotificacion });
      
      return res.status(200).json(notificacion);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerNotificaciones(req, res) {
    try {
      //const idNotificacion = req.params.id;
      const notificaciones = await notificacionService.obtenerNotificaciones();
      
      return res.status(200).json(notificaciones);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearNotificacion(req, res) {
    try {

      const { tema, data, topic} = req.body;
      const nuevaNotificacion = await new notificacionService().enviarNotificacion(tema, data, topic);

      return res.status(200).json(nuevaNotificacion);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async confirmarNotificacion(req, res) {
    try {

      const uuid = req.params.id;
      const nuevaNotificacion = await notificacionService.confirmarNotificacion(uuid);

      return res.status(200).json(nuevaNotificacion);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async notificacionTienda(req, res) {
    try {

      const nuevaNotificacion = await notificacionService.notificacionTienda(req);

      return res.status(200).json(nuevaNotificacion);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  }
  
};





