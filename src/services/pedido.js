const Pedido = require("../db/models").Pedido;
const Usuario = require("../db/models").Usuario;
const Tienda = require("../db/models").Tienda;
const DetallePedido = require("../db/models").DetallePedido;
var sequelize = require("../db/models").sequelize;
const { Op } = require("sequelize");
const _Rol = require("../constants/roles");

const service = {
  async obtenerPedidos() {
    try {
      const ciudades = await Pedido.findAll();

      return ciudades;
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
          valorTotal: productos.reduce((a, b) => a+b, 0)
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
      const Pedido = (await Pedido.findByPk(idPedido)).get({ plain: true });

      return Pedido;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarPedido(Pedido) {
    try {
      const resultadoUpdate = await Pedido.update(Pedido, {
        where: {
          id: Pedido.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
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
          Tienda, Usuario
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
};

module.exports.pedidoService = service;
