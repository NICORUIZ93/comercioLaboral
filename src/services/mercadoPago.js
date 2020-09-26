const mercadopago = require("mercadopago");
const axios = require("axios").default;
const { productoService } = require("./producto");
const { pedidoService } = require("./pedido");
const { v4: uuidv4 } = require('uuid');

class Mercadopago {
  constructor(token) {
    mercadopago.configure({
      //sandbox: true,
      access_token: token,
    });
  }

  async obtenerInformacionPago(id) {
    try {
      const informacionpago = await mercadopago.payment.get(id);
      return informacionpago;
    } catch (error) {
      throw error;
    }
  }

  async procesarNotificacionPago(id) {
    try {
      const informacionpago = await mercadopago.payment.get(id);
      return informacionpago;
    } catch (error) {
      throw error;
    }
  }

  async procesarNotificacionMerchantOrder(id) {
    try {
      const merchantOrder = await mercadopago.merchant_orders.get(id);
      return merchantOrder;
    } catch (error) {
      throw error;
    }
  }

  async obtenerIdPreferencia(datos) {
    try {
      const preferencia = await this.construirPreferencia(datos);
      const prefenreciaMp = await mercadopago.preferences.create(preferencia);

      const { id, init_point, sandbox_init_point } = prefenreciaMp.response;
      console.log('la preferencia');
      console.log(prefenreciaMp);
      await this.guardarPedidoSinConfirmar(datos.comprador, preferencia.items, datos.idTienda, preferencia.external_reference );

      return { id, init_point, sandbox_init_point };
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  async construirPreferencia(datos) {
    try {
      let preference = {};
      const uuidPedido = uuidv4();

      const idProductos = datos.productos.map((p) => {
        return p.id;
      });

      const comprador = datos.comprador;

      const items = (
        await productoService.obtenerProductosPorParametros([
          { id: idProductos },
        ])
      ).map((producto) => {
        const cantidadProductos = parseInt(
          datos.productos.find((p) => p.id === producto.id).cantidad
        );
        const valorProduto = producto.oferta ? producto.valorOferta : producto.valor;
        const valorProdutos = valorProduto * cantidadProductos;

        return {
          id: producto.id,
          title: producto.nombre,
          description: producto.descripcion,
          picture_url: producto.Recursos[0].url
            ? producto.Recursos[0].url
            : null,
          category_id: `${producto.IdCategoria}`,
          quantity: cantidadProductos,
          currency_id: "COP",
          unit_price: parseFloat(valorProduto),
          valorTotal: parseFloat(valorProdutos)
        };
      });

      const payer = {
        name: comprador.nombre,
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

      if (!datos.esMovil) {
        preference.back_urls = {
          success: "https://localhost:3000/success",
          pending: "https://localhost:3000.com/pending",
          failure: "https://localhost:3000.com/error",
        };
        preference.auto_return = "approved";
      }
      
      preference.binary_mode = true;
      preference.items = items;
      preference.payer = payer;
      preference.marketplace_fee = await calcularValorComision(items, datos.comision);
      preference.external_reference = uuidPedido;
      //preference.notification_url = "https://localhost:5000/webhook";

      return preference;
    } catch (error) {
      console.log(`${error}`);
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

      return autorizacion.data;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  static async webHooks(datos) {
    try {
      return "OK";
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  async guardarPedidoSinConfirmar(usuario, productos, idTienda, uuid) {
    try {

      const pedido = {
        usuario,
        productos,
        idTienda,
        uuid
      };

      await pedidoService.crearPedidoMercadoPago(pedido);

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
}

const calcularValorComision = async (productos, comision) => {

  const valorTotalProductos = productos.reduce((a, b) => a + b.valorTotal, 0);
  const porcentajeComision = comision / 100;
  const valorComision = porcentajeComision * valorTotalProductos;
  return  parseFloat(valorComision);
}

module.exports = Mercadopago;
