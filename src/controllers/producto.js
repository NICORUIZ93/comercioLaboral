const { productoService } = require( "../services/producto");

module.exports = {

  async obtenerProductos(req, res) {
    try {
      const productos = await productoService.obtenerProductos();
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerProducto(req, res) {
    try {
      const idProducto = req.params.id;
      const producto = await usuarioService.obtenerProducto(idProducto);
      
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
  }


};





