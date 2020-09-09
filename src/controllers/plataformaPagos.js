const Mercadopago  = require( "../services/mercadoPago");
const { tiendaService } = require("../services/tienda");

module.exports = {

  async obtenerPreferenciaMercadoPago(req, res) {
    try {

      let datos = req.body;

      const tienda = await tiendaService.obtenerTienda(datos.idTienda);

      datos.comision = tienda.porcentajeComision;
      datos.tokenMP = tienda.tokenMP;

      const mercadoPago = new Mercadopago(datos);
      const preferencia = await mercadoPago.obtenerIdPreferencia();

      return res.status(200).json(preferencia);

    } catch (e) {
      res.status(500).json(e);
    }
  }
  

};





