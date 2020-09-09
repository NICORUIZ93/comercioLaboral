const Mercadopago  = require( "../services/mercadoPago");
const { tiendaService } = require("../services/tienda");

module.exports = {

  async obtenerPreferenciaMercadoPago(req, res) {
    try {

      let datos = req.body;

      const tienda = await tiendaService.obtenerTienda(datos.idTienda);

      datos.comision = tienda.porcentajeComision;
      datos.tokenMP = tienda.tokenMP;

      const mercadoPago = new Mercadopago();
      const preferencia = await mercadoPago.obtenerIdPreferencia(datos);

      return res.status(200).json(preferencia);

    } catch (e) {
      res.status(500).json(e);
    }
  },
  async webHooks(req, res) {
    try {

      const { type, id } = req.body;

      const mercadopago = new Mercadopago().obtenerInstancia();
      const payment = await mercadopago.payment.get(id);

      console.log(payment);
      console.log(req.body);
      console.log(req.query);

      return res.status(200).send();

    } catch (e) {
      res.status(500).json(e);
    }
  }

};





