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
      const preferencia = await mercadoPago.obtenerIdPreferencia(datos);

      return res.status(200).json(preferencia);
    } catch (e) {
      res.status(500).json(JSON.stringify(e));
    }
  },
  async webHooks(req, res) {
    try {
      /*
      if (req.query.topic) {
        switch (req.query.topic) {
          case "payment":
            console.log("topic => payment");
            console.log(req.query);
            console.log(req.body);
            break;

          default:
            
            console.log("topic => otro");
            const { id } = req.query;
            console.log(id);
            console.log(req.query);
            //const merchantOrder = await mercadopago.procesarNotificacionMerchantOrder(id);
            //console.log(merchantOrder);
            console.log(req.body);
            
            break;
        }
      }
      */
      if (req.query.type) {
        switch (req.query.type) {
          case "payment":
            console.log("type => payment");
            console.log("body => ");
            console.log(req.body);

            let mercadopago;
            const { data } = req.body;
            if (data) {
              console.log("data => ");
              console.log(data);
              mercadopago = new Mercadopago(process.env.MP_ACCESS_TOKEN_TEST);
              const pagoInfo = await mercadopago.obtenerInformacionPago(data.id);
              console.log('pago info => ');
              console.log(pagoInfo);

              if (pagoInfo.body.external_reference) {
                console.log("data.external_reference => ");
                console.log(pagoInfo.body.external_reference);

                const pedido = await pedidoService.obtenerPedidoPorParametros([
                  { uuid: pagoInfo.body.external_reference },
                ]);
                if (pedido) {
                  console.log("pedido => ");
                  console.log(pedido);

                  mercadopago = new Mercadopago(pedido.Tienda.tokenMP);
                  console.log("data.order.id => ");
                  console.log(pagoInfo.order.id);
                  const payment = await mercadopago.procesarNotificacionMerchantOrder(
                    pagoInfo.order.id
                  );
                  console.log(payment);
                }
              }
            }
            break;

          default:
            //console.log("type => otro");
            //console.log(req.query);
            //console.log(req.body);
            break;
        }
      }

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
};
