const Producto = require("../db/models").Producto;
const TiendaProducto = require("../db/models").TiendaProducto;
var sequelize = require('../db/models').sequelize;

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
  async crearProducto(idTienda, nuevoProducto) {
    try {

      const result = await sequelize.transaction(async (t) => {

        const resultadocreate = await Producto.create(nuevoProducto, { transaction: t });
    
        await TiendaProducto.create({ IdTienda: idTienda, IdProducto: resultadocreate.id, stock: resultadocreate.cantidad }, { transaction: t });

        return resultadocreate;
    
      });
     
      return result;

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