const { productoService } = require( "../services/producto");
const paginador = require("../helpers/paginacion/paginador");
const helperGenericos = require("../helpers/genericos/funciones");

module.exports = {

  async obtenerProductos(req, res) {
    try {
      const productos = await productoService.obtenerProductos();
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const productos = await productoService.obtenerProductosPorTienda(idTienda);
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosPorTiendaFeria(req, res) {
    try {
      const { idTienda, idFeria } = req.query;
      const productos = await productoService.obtenerProductosTiendaFeria(idTienda, idFeria);
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosPorFeria(req, res) {
    try {
      const idFeria = req.params.id;
      const productos = await productoService.obtenerProductosFeria(idFeria);
      return res.status(200).json(productos);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProductosOferta(req, res) {
    try {
      let productos = await productoService.obtenerProductosPorParametros([{ oferta: true }]);
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

      const productos = await productoService.obtenerProductosPaginado(pagina, limit, offset);

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

      const productos = await productoService.obtenerProductosPorTiendaPaginado(idTienda, paginado);

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

      const productos = await productoService.buscarProductosPaginado(busqueda, paginado);

      return res.status(200).json(productos);
      
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerProducto(req, res) {
    try {
      const idProducto = req.params.id;
      const producto = await productoService.obtenerProducto(idProducto);
      
      return res.status(200).json(producto);
    } catch (e) {
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearProducto(req, res) {
    try {

      const { IdTienda, ...producto } = req.body;
      const nuevoProducto = await productoService.crearProducto(IdTienda, producto);

      return res.status(200).json(nuevoProducto);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },

  async actualizarProducto(req, res) {
    try {
      const { id, ...producto } = req.body;
      const nuevoProducto = await productoService.actualizarProducto(producto, id);

      return res.status(200).json({ code: 200, mesaage: 'producto actualizado' });

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },

  async eliminarProducto(req, res) {
    try {

      const idProducto = req.params.id;
      const nuevoProducto = await productoService.eliminarProducto(idProducto);

      return res.status(200).json({ code: 200, mesaage: 'producto eliminado' });

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
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
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async eliminarRecursoProducto(req, res) {
    try {

      const { idProducto, idRecurso } = req.query;

      const respuesta = await productoService.eliminarRecursoProducto(idProducto, idRecurso);

      return res.status(200).json(respuesta);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  }

};





