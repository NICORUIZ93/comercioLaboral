const { productoService } = require( "../services/producto");
const paginador = require("../helpers/paginacion/paginador");
const helperGenericos = require("../helpers/genericos/funciones");

module.exports = {

  async obtenerProductos(req, res) {
    try {
      const productos = await productoService.obtenerProductos(true);
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const productos = await productoService.obtenerProductosPorTienda(idTienda, true);
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosOferta(req, res) {
    try {
      let productos = await productoService.obtenerProductosPorParametros([{ oferta: true }], true);
      productos = productos.sort(helperGenericos.ordenarRandom);
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosMasVendidos(req, res) {
    try {
      let productos = await productoService.obtenerProductosMasVendidos();
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosPorPedido(req, res) {
    try {
      const idPedido = req.params.id;
      let productos = await productoService.obtenerProductosPorPedido(idPedido);
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosPaginado(req, res) {
    try {

      const { pagina, tamano } = req.query;
      const { limit, offset } = paginador.obtenerPaginacion(pagina, tamano);

      const productos = await productoService.obtenerProductosPaginado(pagina, limit, offset, true);

      return res.status(200).json(productos);
      
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosPorTiendaPaginado(req, res) {
    try {

      const { pagina, tamano, idTienda } = req.query;
      const { limit, offset } = paginador.obtenerPaginacion(pagina, tamano);
      const paginado = { pagina, limit, offset};

      const productos = await productoService.obtenerProductosPorTiendaPaginado(idTienda, paginado, true);

      return res.status(200).json(productos);
      
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async buscarProductosPaginado(req, res) {
    try {

      const { pagina, tamano, busqueda } = req.query;
      const { limit, offset } = paginador.obtenerPaginacion(pagina, tamano);
      const paginado = { pagina, limit, offset};

      const productos = await productoService.buscarProductosPaginado(busqueda, paginado, true);

      return res.status(200).json(productos);
      
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProducto(req, res) {
    try {
      const idProducto = req.params.id;
      const producto = await productoService.obtenerProducto(idProducto, true);
      
      return res.status(200).json(producto);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },

};





