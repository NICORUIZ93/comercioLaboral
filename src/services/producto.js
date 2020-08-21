const Producto = require("../db/models").Producto;

const service = {
  async obtenerProductos() {
    try {

      const productos = await Producto.findAll();

      return productos;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async obtenerProducto(idProducto) {
    try {

      const producto = (await Producto.findByPk(idProducto)).get({plain:true});
  
      return producto;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async crearProducto(nuevoProducto) {
    try {
             
      const resultadocreate = (await Producto.create(nuevoProducto)).get({plain:true});

      return resultadocreate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarProducto(producto) {
    try {
             
    const resultadoUpdate = (await Producto.update(producto, {
        where: {
          id: producto.id
        }
      }));

      return resultadoUpdate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarProducto(idProducto) {
    try {
             
    const resultadoDestroy = (await Producto.destroy({
        where: {
          id: idProducto
        }
      }));

      return resultadoDestroy;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  
}

module.exports.productoService = service;