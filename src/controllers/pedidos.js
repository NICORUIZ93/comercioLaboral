const { pedidoService } = require( "../services/pedido");

module.exports = {


  async obtenerpedido(req, res) {
    try {
      const idpedido = req.params.id;
      const pedido = await pedidoService.obtenerpedido(idpedido);
      
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
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{IdTienda: idTienda }]);
      
      return res.status(200).json(pedidos);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerpedidoCiudadesPorDepartamento(req, res) {
    try {
      const departamento = req.params.id;
      const pedido = await pedidoService.obtenerpedidoCiudadPorDepartamento(departamento);
      
      return res.status(200).json(pedido);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerpedidoDepartamentos(req, res) {
    try {
      //const idpedido = req.params.id;
      const pedido = await pedidoService.obtenerpedidoDepartamentos();
      
      return res.status(200).json(pedido);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  
};




