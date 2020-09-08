const mercadopago = require("mercadopago");

class Mercadopago {
  constructor() {
    mercadopago.configure({
      sandbox: true,
      access_token: process.env.MP_ACCESS_TOKEN,
    });
  }

  async obtenerUrlCheckout(datos) {
    try {

      const preferencia = await this.construirPreferencia(datos);
      const urlCheckout = await mercadopago.preferences.create(preferencia);

      return urlCheckout;

    } catch (error) {}
  }

  async construirPreferencia(datos) {
    let preference = {};

    var item = {
      title: "Durable Iron Clock",
      quantity: 9,
      currency_id: "COP",
      unit_price: 30.4,
    };

    var payer = {
      email: "demo@mail.com",
    };

    preference.items = [item];
    preference.payer = payer;
  }
}

module.exports.plataformaPagosService = Mercadopago;
