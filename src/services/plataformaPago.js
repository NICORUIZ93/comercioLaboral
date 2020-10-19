const mercadopago = require("mercadopago");
const axios = require("axios").default;
const { productoService } = require("./producto");
const { pedidoService } = require("./pedido");
const { envioService } = require("./envios");
const { tiendaProductoService } = require("./tiendaProducto");
const { v4: uuidv4 } = require("uuid");
const _EstadosEnvio = require("../constants/estadosEnvio");

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
      console.log(`${error}`);
      throw error;
    }
  }

  static async procesarNotificacionPago(data) {
    try {
      if (data) {
        console.log("procesarNotificacionPago");
        console.log(data);

        let mp = new Mercadopago(process.env.MP_ACCESS_TOKEN_TEST);
        const pagoInfo = await mp.obtenerInformacionPago(data.id);

        if (pagoInfo.body.external_reference) {
          let pedido = await pedidoService.obtenerPedidoPorParametros([
            { uuid: pagoInfo.body.external_reference },
          ]);

          if (pedido) {
            mp = new Mercadopago(pedido.Tienda.tokenMP);
            const merchantOrder = await mp.obtenerMerchantOrder(
              pagoInfo.body.order.id
            );
            console.log("prev guardarDatosPago");
            console.log(merchantOrder.body.payments);
            await guardarDatosPago(merchantOrder.body.payments, pedido.id);

            let pedidoPorActualizar = {
              idPago: data.id,
              estado: pagoInfo.body.status,
              confirmado: false,
            };

            console.log("status: " + pagoInfo.body.status);
            console.log("status merchant: " + merchantOrder.body.status);
            if (
              pagoInfo.body.status === "approved" &&
              merchantOrder.body.status === "closed"
            ) {
              pedidoPorActualizar.confirmado = true;
            }

            console.log("previo procesarCambioEnPedido: ");
            console.log(pedidoPorActualizar);

            await procesarCambioEnPedido(pedido, pedidoPorActualizar);
          }
        }
      }
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  async obtenerMerchantOrder(id) {
    try {
      const merchantOrder = await mercadopago.merchant_orders.get(id);
      return merchantOrder;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  async obtenerIdPreferencia(datos) {
    try {
      const preferencia = await this.construirPreferencia(datos);
      const prefenreciaMp = await mercadopago.preferences.create(preferencia);

      const { id, init_point, sandbox_init_point } = prefenreciaMp.response;
      console.log("la preferencia");
      console.log(prefenreciaMp);
      await this.guardarPedidoSinConfirmar(
        datos.comprador,
        preferencia.items,
        datos.idTienda,
        preferencia.external_reference,
        preferencia.marketplace_fee
      );

      return {
        id,
        init_point,
        sandbox_init_point,
        uuid: preferencia.external_reference,
      };
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
        const valorProduto = obtenerValorProducto(producto);

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
          unit_price: valorProduto,
          valorTotal: valorProduto,
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
      preference.marketplace_fee = await calcularValorComision(
        items,
        datos.comision
      );
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

  static async refescarTokenVendedor(refreshToken) {
    try {
      const autorizacion = await axios.post(
        "https://api.mercadopago.com/oauth/token",
        {
          client_id: process.env.MP_CLIENT_ID_TEST,
          client_secret: process.env.MP_CLIENT_SECRET_TEST,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }
      );

      return autorizacion.data;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  static async obtenerSaldo(userId, accessToken) {
    try {
      const saldo = await axios.get(
        `https://api.mercadopago.com/users/${userId}/mercadopago_account/balance`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return saldo.data;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }

  async guardarPedidoSinConfirmar(
    usuario,
    productos,
    idTienda,
    uuid,
    valorComision
  ) {
    try {
      const pedido = {
        usuario,
        productos,
        idTienda,
        uuid,
        estado: "pending",
        estadoEnvio: _EstadosEnvio._Preparando,
        valorComision,
      };

      await pedidoService.crearPedidoMercadoPago(pedido);
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
  static async test(id) {
    try {
      await iniciarProcesoDeEnvio(id);
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
}

//Privados
const calcularValorComision = async (productos, comision) => {
  const valorTotalProductos = productos.reduce((a, b) => a + b.valorTotal, 0);
  const porcentajeComision = comision / 100;
  const valorComision = porcentajeComision * valorTotalProductos;
  return parseFloat(valorComision);
};

const obtenerValorProducto = async (producto) => {
  const valorProducto = producto.feria
    ? producto.valorFeria
    : producto.oferta
    ? producto.valorOferta
    : producto.valor;
    console.log('es feria?' + producto.feria);
    console.log('valor feria: '+ producto.valorFeria);
    console.log('valorProducto' + parseFloat(valorProducto));
  return parseFloat(valorProducto);
};

const procesarCambioEnPedido = async (pedido, cambiosEnPedido) => {
  try {
    console.log(`procesarCambioEnPedido`);
    await pedidoService.actualizarPedido(cambiosEnPedido, pedido.id);

    console.log(`estado pedido`);
    console.log(cambiosEnPedido.confirmado);

    if (cambiosEnPedido.confirmado) {
      console.log(`pedido aprobado`);
      await actualizarStockTienda(pedido);
      await iniciarProcesoDeEnvio(pedido);
    }
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
};

const actualizarStockTienda = async (pedido) => {
  try {
    const idProductos = pedido.Detalle.map((detalle) => {
      return detalle.IdProducto;
    });
    const productos = await tiendaProductoService.obtenerTiendaProductosPorParametros(
      [{ IdTienda: pedido.IdTienda }, { IdProducto: idProductos }]
    );

    for (const producto of productos) {
      if (producto.stock > 0) {
        const stock = producto.stock - 1;
        await tiendaProductoService.actualizarTiendaProducto(
          { stock },
          { IdTienda: pedido.IdTienda, IdProducto: producto.IdProducto }
        );

        await productoService.actualizarProductoPorId(
          { cantidad: stock },
          producto.IdProducto
        );
      }
    }
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
};

const iniciarProcesoDeEnvio = async (pedido) => {
  try {
    console.log(`iniciarProcesoDeEnvio`);
    await envioService.crearEnvio({
      idPedido: pedido.id,
      idTienda: pedido.IdTienda,
      estado: _EstadosEnvio.Preparando,
    });
  } catch (error) {
    console.log(`${error}`);
    throw error;
  }
};

const guardarDatosPago = async (detalles, idPedido) => {
  console.log("guardarDatosPago");
  console.log(detalles);

  if (detalles.length > 0) {
    detalles.map(async (detalle) => {
      const pago = {
        idMp: detalle.id,
        idPedido,
        monto_transaccion: detalle.transaction_amount,
        monto_total_pagado: detalle.total_paid_amount,
        costo_envio: detalle.shipping_cost,
        moneda: detalle.currency_id,
        estado: detalle.status,
        detalle_estado: detalle.status_detail,
        tipo_operacion: detalle.operation_type,
        fecha_aprobado: detalle.date_approved,
        fecha_creado: detalle.date_created,
        ultima_modificacion: detalle.last_modified,
        monto_reembolsado: detalle.amount_refunded,
      };
      await pedidoService.guardarDetallePago(pago, idPedido);
    });
  }
};

module.exports = Mercadopago;
