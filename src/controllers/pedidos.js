const { pedidoService } = require( "../services/pedido");
const _EstadosPedido = require("../constants/estadosPedido");

module.exports = {


  async obtenerPedido(req, res) {
    try {
      const idpedido = req.params.id;
      const pedido = await pedidoService.obtenerPedido(idpedido);
      
      return res.status(200).json(pedido);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerPedidos(req, res) {
    try {
      const pedidos = await pedidoService.obtenerPedidos();
      
      return res.status(200).json(pedidos);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerPedidosPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ '$Tienda.id$': idTienda }]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerComprasPorUsuario(req, res) {
    try {
      const idUsuario = req.params.id;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ IdUsuario: idUsuario, estado: [_EstadosPedido.Aprovado, _EstadosPedido.Pendiente] }]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerComprasPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ '$Tienda.id$': idTienda , confirmado: true}]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async confirmarPedido(req, res) {
    try {
      const idTienda = req.params.id;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ '$Tienda.id$': idTienda }]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerEstadoPedido(req, res) {
    try {
      const uuid = req.params.id;
      const pedidos = await pedidoService.obtenerPedidoPorParametros([{ uuid: uuid }]);
      
      return res.status(200).json(pedidos.estado);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async ultimosPedidos(req, res) {
    try {
      const pedidos = await pedidoService.pedidosUltimos();
      return res.status(200).json(pedidos);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  }
  
};





