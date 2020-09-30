const { pedidoService } = require( "../services/pedido");

module.exports = {


  async obtenerPedido(req, res) {
    try {
      const idpedido = req.params.id;
      const pedido = await pedidoService.obtenerPedido(idpedido);
      
      return res.status(200).json(pedido);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerPedidos(req, res) {
    try {
      const pedidos = await pedidoService.obtenerPedidos();
      
      return res.status(200).json(pedidos);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerPedidosPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ '$Tienda.id$': idTienda }]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerComprasPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ '$Tienda.id$': idTienda }, { confirmado: true }]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async confirmarPedido(req, res) {
    try {
      const idTienda = req.params.id;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ '$Tienda.id$': idTienda }]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerEstadoPedido(req, res) {
    try {
      const uuid = req.params.id;
      const pedidos = await pedidoService.obtenerPedidoPorParametros([{ uuid: uuid }]);
      
      return res.status(200).json(pedidos.estado);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  
};





