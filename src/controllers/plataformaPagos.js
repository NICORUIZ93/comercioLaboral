const MercadoPagoAdapter = require("../models/mercadoPagoAdapter");
const { tiendaService } = require("../services/tienda");


module.exports = {
  async obtenerPreferenciaMercadoPago(req, res) {
    try {
      let datos = req.body;

      const tienda = await tiendaService.obtenerTienda(datos.idTienda);

      datos.comision = tienda.porcentajeComision;

      let plataforma = new MercadoPagoAdapter().configurar(tienda.tokenMP);
      let informacionCheckout = await plataforma.obtenerInformacionDeCheckOut(datos);
      informacionCheckout.token = tienda.tokenMP;
      informacionCheckout.publicKey = tienda.publicKeyMP;

      return res.status(200).json(informacionCheckout);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async webHooks(req, res) {
    try {

      await new MercadoPagoAdapter().capturarCambiosEnEstadoDelPago(req);

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(200).send();
    }
  }
};
