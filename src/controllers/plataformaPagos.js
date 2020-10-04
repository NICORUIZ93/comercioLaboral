const Mercadopago = require("../services/mercadoPago");
const { tiendaService } = require("../services/tienda");
const { pedidoService } = require("../services/pedido");

module.exports = {
  async obtenerPreferenciaMercadoPago(req, res) {
    try {
      let datos = req.body;

      const tienda = await tiendaService.obtenerTienda(datos.idTienda);

      datos.comision = tienda.porcentajeComision;

      const mercadoPago = new Mercadopago(tienda.tokenMP);
      let preferencia = await mercadoPago.obtenerIdPreferencia(datos);
      preferencia.token = tienda.tokenMP;
      preferencia.publicKey = tienda.publicKeyMP;

      return res.status(200).json(preferencia);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async webHooks(req, res) {
    try {

      if (req.query.type) {
        if (req.query.type === "payment") {
          const { data } = req.body;
          await Mercadopago.procesarNotificacionPago(data);
        }
      }

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(200).send();
    }
  },
  async test(req, res) {
    try {

      await Mercadopago.test(req.params.id);
    
      return res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(200).send();
    }
  },
};
