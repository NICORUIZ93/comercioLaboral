const Pedido = require("../db/models").Pedido;
const Producto = require("../db/models").Producto;
const Usuario = require("../db/models").Usuario;
const Tienda = require("../db/models").Tienda;
const DetallePedido = require("../db/models").DetallePedido;
const DetallePago = require("../db/models").DetallePago;
var sequelize = require("../db/models").sequelize;
const { Op } = require("sequelize");
const _Rol = require("../constants/roles");

const service = {
  async obtenerPedidos() {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          Tienda, Usuario, { model:DetallePago, as: 'DetallesPago' }, { model: DetallePedido, as: 'Detalle' }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
      });

      return pedidos;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearPedido(nuevoPedido) {
    try {
      let resultadocreate = await Pedido.create(nuevoPedido);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearPedidoMercadoPago(nuevoPedido) {
    try {
      const { usuario, productos, idTienda, uuid } = nuevoPedido;

      //let pedidoCreado = {};

      await sequelize.transaction(async (transaction) => {

        const usuarioACrear = {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          dni: usuario.identificacion.numero,
          telefono: parseInt(usuario.telefono.numero),
          direccion: usuario.direccion.direccion,
          IdRol: _Rol.CompradorID
        };

        const [user, created] = 
          await Usuario.findOrCreate({
            where: { correo: usuarioACrear.correo },
            defaults: usuarioACrear,
            transaction
          });
        
        const pedido = {
          IdTienda: idTienda,
          IdUsuario: user.id,
          valorTotal: 0,
          confirmado: false,
          uuid: uuid,
          valorTotal: productos.reduce((a, b) => a + b.valorTotal, 0)
          //Detalle: detallesPedido,
        };

        //pedidoCreado = await Pedido.create(pedido, { include: [{ association: Pedido.Detalle , as: 'Detalle'}], transaction });
        const pedidoCreado = (await Pedido.create(pedido, { transaction })).get({
          plain: true,
        });

        const detallesPedido = productos.map((dp) => {
          return {
            IdPedido: pedidoCreado.id,
            IdProducto: dp.id,
            valor: dp.unit_price,
            descuento: 0,
            impuestos: 0,
            cantidad: dp.quantity
          };
        });
        
        await DetallePedido.bulkCreate(detallesPedido, {
          transaction,
        });
        
       
      });

      //return pedidoCreado;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerPedido(idPedido) {
    try {
      const Pedido = (await Pedido.findByPk(idPedido, {
        include: [
          Tienda, Usuario, { model: DetallePedido, as: 'Detalle' }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
      })).get({ plain: true });

      return Pedido;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarPedido(pedido, id) {
    try {
      console.log('actualizarPedido #' + id);
      const resultadoUpdate = await Pedido.update(pedido, {
        where: {
          id: id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      console.log('error en actualizarPedido');
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarPedido(idPedido) {
    try {
      const resultadoDestroy = await Pedido.destroy({
        where: {
          id: idPedido,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerPedidoPorParametros(parametrosWhere) {
    try {
      const pedido = await Pedido.findOne({
        where: {
          [Op.or]: parametrosWhere,
        },
        include: [
          Tienda, Usuario, { model: DetallePedido, as: 'Detalle' }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
      });

      return pedido;
      
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerPedidosPorParametros(parametrosWhere) {
    try {
      const pedidos = await Pedido.findAll({
        where: {
          [Op.or]: parametrosWhere,
        },
        include: [
          Tienda, Usuario, { model: DetallePedido, as: 'Detalle' }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
      });

      return pedidos;
      
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async guardarDetallePago(detalle, idPedido) {
    try {

      const [DetallePagos, created] = await DetallePago.findOrCreate({
        where: { idPedido: idPedido, estado: detalle.estado  },
        defaults: detalle
      });

      return created;
      
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.pedidoService = service;
