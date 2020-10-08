const { envioService } = require( "../services/envios");
const _EstadosEnvio = require("../constants/estadosEnvio");

module.exports = {

  async obtenerEnviosPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const Envios = await envioService.obtenerEnviosPorTienda(idTienda);
      return res.status(200).json(Envios);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerEnviosPorProducto(req, res) {
    try {
      const idProducto = req.params.id;
      const Envio = await envioService.obtenerEnviosPorProducto(idProducto);
      
      return res.status(200).json(Envio);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerEnvio(req, res) {
    try {
      const id = req.params.id;
      const Envio = await envioService.obtenerEnvio(id);
      
      return res.status(200).json(Envio);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearEnvio(req, res) {
    try {

      const nuevoEnvio = await envioService.crearEnvio(req.body);

      return res.status(200).json(nuevoEnvio);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async actualizarEstadoEnvio(req, res) {
    try {

      const { idPedido, estado } = req.body;

      const estadoActual = await envioService.obtenerUltimoEstadoEnvio({ idPedido: idPedido });
      console.log("estado actual");
      console.log(estadoActual);
      const estadoSiguiente = estadoActual + 1;

      if(estado != estadoSiguiente) throw Error('El estado al que trata de actualizar no es correcto');

      const nuevoEnvio = await envioService.crearEnvio(req.body);

      return res.status(200).json(nuevoEnvio);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async eliminarEnvio(req, res) {
    try {

      const idEnvio = req.params.id;
      const nuevoEnvio = await envioService.eliminarEnvio(idEnvio);

      return res.status(200).json(nuevoEnvio);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  }


};





