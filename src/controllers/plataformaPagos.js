const Mercadopago  = require( "../services/mercadoPago");
const { tiendaService } = require("../services/tienda");

module.exports = {

  async obtenerPreferenciaMercadoPago(req, res) {
    try {

      let datos = req.body;

      const tienda = await tiendaService.obtenerTienda(datos.idTienda);

      datos.comision = tienda.porcentajeComision;
 
      const mercadoPago = new Mercadopago(tienda.tokenMP);
      const preferencia = await mercadoPago.obtenerIdPreferencia(datos);

      return res.status(200).json(preferencia);

    } catch (e) {
      res.status(500).json(e);
    }
  },
  async webHooks(req, res) {
    try {

      const { type, id } = req.body;

      console.log(req.body);
      console.log(req.query);
      console.log(type);
      console.log(id);

      const mercadopago = new Mercadopago(process.env.MP_ACCESS_TOKEN_TEST);
      const payment = mercadopago.obtenerInformacionPago(id);

      console.log(payment);
      
      return res.status(200).send();

    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

};





