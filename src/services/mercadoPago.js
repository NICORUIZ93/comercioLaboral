const mercadopago = require("mercadopago");
const axios = require("axios").default;
const { productoService } = require("./producto");

class Mercadopago {
  constructor(datos) {
    this.datos = datos;
    mercadopago.configure({
      //sandbox: true,
      access_token: datos.tokenMP,
    });
  }

  async obtenerIdPreferencia() {
    try {
      const preferencia = await this.construirPreferencia();
      const idPreferencia = await mercadopago.preferences.create(preferencia);

      const { id, init_point, sandbox_init_point } =  idPreferencia.response;

      return {id, init_point, sandbox_init_point};

    } catch (error) {
      throw error;
    }
  }

  async construirPreferencia() {
    try {
      let preference = {};

      const idProductos = this.datos.productos.map((p) => {
        return p.id;
      });

      const comprador = this.datos.comprador;

      const items = (
        await productoService.obtenerProductosPorParametros([
          { id: idProductos },
        ])
      ).map((producto) => {
        return {
          id: producto.id,
          title: producto.nombre,
          description: producto.descripcion,
          picture_url: producto.Recursos[0].url
            ? producto.Recursos[0].url
            : null,
          category_id: `${producto.IdCategoria}`,
          quantity: parseInt(this.datos.productos.find(p => p.id === producto.id).cantidad),
          currency_id: "COP",
          unit_price: producto.oferta ? parseFloat(producto.valorOferta) : parseFloat(producto.valor),
        };
      });

      const payer = {
        name: comprador.nobre,
        surname: comprador.apellido,
        email: comprador.correo,
        date_created: comprador.fechaCreacion,
        phone: {
          area_code: comprador.telefono.codigoArea,
          number: parseInt(comprador.telefono.numero),
        },
        identification: {
          type: comprador.identificacion.tipo,
          number: comprador.identificacion.numero,
        },
        address: {
          street_name: comprador.direccion.direccion,
          street_number: 0,
          zip_code: comprador.direccion.codigoPostal,
        },
      };

      
      if (!this.datos.esMovil) {
        preference.back_urls = {
          success: "https://localhost:3000/success",
          pending: "https://localhost:3000.com/pending",
          failure: "https://localhost:3000.com/error",
        };
      }
      

      preference.items = items;
      preference.payer = payer;
      preference.marketplace_fee = parseFloat(this.datos.comision);
      //preference.notification_url = "https://localhost:3000/webhook";
      //preference.auto_return = "approved";

      return preference;
    } catch (error) {
      throw error;
    }
  }

  static async obtenerTokenVendedor(codigoMP) {
    try {
      const autorizacion = await axios.post(
        "https://api.mercadopago.com/oauth/token",
        {
          client_id: process.env.MP_CLIENT_ID_TEST,
          client_secret: process.env.MP_CLIENT_SECRET_TEST,
          grant_type: "authorization_code",
          code: codigoMP,
          redirect_uri: process.env.MP_REDIRECT_URI_TEST,
        }
      );

      return autorizacion.data.access_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Mercadopago;
