const { mensajeService } = require( "../services/mensaje");

module.exports = {

  async obtenerMensajesPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const mensajes = await mensajeService.obtenerMensajesPorTienda(idTienda);
      return res.status(200).json(mensajes);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerMensajesPorProducto(req, res) {
    try {
      const idProducto = req.params.id;
      const mensaje = await mensajeService.obtenerMensajesPorProducto(idProducto);
      
      return res.status(200).json(mensaje);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerMensajesPorId(req, res) {
    try {
      const id = req.params.id;
      const mensaje = await mensajeService.obtenerMensajesPorId(id);
      
      return res.status(200).json(mensaje);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearMensaje(req, res) {
    try {

      const nuevoMensaje = await mensajeService.crearMensaje(req.body);

      return res.status(200).json(nuevoMensaje);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async eliminarMensaje(req, res) {
    try {

      const idMensaje = req.params.id;
      const nuevoMensaje = await mensajeService.eliminarMensaje(idMensaje);

      return res.status(200).json(nuevoMensaje);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  }


};





