const { productoService } = require( "../services/producto");
const paginador = require("../helpers/paginacion/paginador");

module.exports = {

  async obtenerProductos(req, res) {
    try {
      const productos = await productoService.obtenerProductos();
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerProductosPaginado(req, res) {
    try {

      const { pagina, tamano } = req.query;
      const { limit, offset } = paginador.obtenerPaginacion(pagina, tamano);

      const productos = await productoService.obtenerProductosPaginado(pagina, limit, offset);

      return res.status(200).json(productos);
      
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerProductosPorTiendaPaginado(req, res) {
    try {

      const { pagina, tamano, idTienda } = req.query;
      const { limit, offset } = paginador.obtenerPaginacion(pagina, tamano);
      const paginado = { pagina, limit, offset};

      const productos = await productoService.obtenerProductosPorTiendaPaginado(idTienda, paginado);

      return res.status(200).json(productos);
      
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async buscarProductosPaginado(req, res) {
    try {

      const { pagina, tamano, busqueda } = req.query;
      const { limit, offset } = paginador.obtenerPaginacion(pagina, tamano);
      const paginado = { pagina, limit, offset};

      const productos = await productoService.buscarProductosPaginado(busqueda, paginado);

      return res.status(200).json(productos);
      
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerProducto(req, res) {
    try {
      const idProducto = req.params.id;
      const producto = await productoService.obtenerProducto(idProducto);
      
      return res.status(200).json(producto);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async crearProducto(req, res) {
    try {

      const { IdTienda, ...producto } = req.body;
      const nuevoProducto = await productoService.crearProducto(IdTienda, producto);

      return res.status(200).json(nuevoProducto);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },

  async actualizarProducto(req, res) {
    try {

      const nuevoProducto = await productoService.actualizarProducto(req.body);

      return res.status(200).json(nuevoProducto);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },

  async eliminarProducto(req, res) {
    try {

      const idProducto = req.params.id;
      const nuevoProducto = await productoService.eliminarProducto(idProducto);

      return res.status(200).json(nuevoProducto);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },
  async cargarRecursosProducto(req, res) {
    try {

      const idProducto = req.body.idProducto;
      const recursos = req.body.recursos;
      const recursosCargados = await productoService.cargarRecursosProducto(idProducto, recursos);

      return res.status(200).json(recursosCargados);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }

};





