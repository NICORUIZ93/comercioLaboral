const Producto = require("../db/models").Producto;
const TiendaProducto = require("../db/models").TiendaProducto;
const Categoria = require("../db/models").Categoria;
const Tienda = require("../db/models").Tienda;
const Recurso = require("../db/models").Recurso;
const ProductoRecurso = require("../db/models").ProductoRecurso;
var sequelize = require("../db/models").sequelize;
const paginador = require("../helpers/paginacion/paginador");

const service = {
  async obtenerProductos() {
    try {
      const productos = await Producto.findAll({
        include: [
          Tienda,
          {
            model: Categoria,
            as: "Categoria",
            attributes: ["id", "nombre"],
          },
          {
            model: Recurso,
            as: "Recursos",
            attributes: ["id", "nombre", "key", "extension"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      return productos.map((p) => {
        const { Tiendas, Recursos, ...producto } = p.dataValues;
        producto.IdTienda = Tiendas[0].id;
        producto.NombreTienda = Tiendas[0].nombre;
        producto.Recurso = Recursos[0];
        return producto;
      });
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerProductosPaginado(page, limit, offset) {
    try {
      const productos = await Producto.findAndCountAll({
        limit, offset,
        include: [
          Tienda,
          {
            model: Categoria,
            as: "Categoria",
            attributes: ["id", "nombre"],
          },
          {
            model: Recurso,
            as: "Recursos",
            attributes: ["id", "nombre", "key", "extension"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      const porductosFiltrados = productos.rows.map((p) => {
        const { Tiendas, Recursos, ...producto } = p.dataValues;
        producto.IdTienda = Tiendas[0].id;
        producto.NombreTienda = Tiendas[0].nombre;
        producto.Recurso = Recursos[0];
        return producto;
      });
      productos.rows = porductosFiltrados;

      return paginador.paginarDatos(productos, page, limit);

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerProducto(idProducto) {
    try {
      const producto = await Producto.findByPk(idProducto, {
        include: [
          Tienda,
          {
            model: Categoria,
            as: "Categoria",
            attributes: ["id", "nombre"]
          },
          {
            model: Recurso,
            as: "Recursos",
            attributes: ["id", "nombre", "key", "extension"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if(!producto) throw Error('No existe el producto indicado');

      const { Tiendas, Recursos, ...productoFiltrado } = producto.dataValues;
      productoFiltrado.IdTienda = Tiendas[0].id;
      productoFiltrado.NombreTienda = Tiendas[0].nombre;
      productoFiltrado.Recurso = Recursos[0];

      return productoFiltrado;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearProducto(idTienda, nuevoProducto) {
    try {
      let recursosAgregadosProducto = [];
      let resultadoNuevoProducto;

      await sequelize.transaction(async (t) => {
         resultadoNuevoProducto = (await Producto.create(nuevoProducto, {
          transaction: t,
        })).get({
          plain: true,
        });

        await TiendaProducto.create(
          {
            IdTienda: idTienda,
            IdProducto: resultadoNuevoProducto.id,
            stock: resultadoNuevoProducto.cantidad,
          },
          { transaction: t }
        );

        //return resultadoNuevoProducto;
      });

      if (resultadoNuevoProducto) {
        if (nuevoProducto.imagenes) {
          recursosAgregadosProducto = await agregarRecursosProducto(
            nuevoProducto.imagenes,
            resultadoNuevoProducto.id
          );
          resultadoNuevoProducto.imagenes = recursosAgregadosProducto;
        }
      }

      return resultadoNuevoProducto;

      
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarProducto(producto) {
    try {
      const resultadoUpdate = await Producto.update(producto, {
        where: {
          id: producto.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarProducto(idProducto) {
    try {
      const resultadoDestroy = await Producto.destroy({
        where: {
          id: idProducto,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      return `Error ${error}`;
    }
  },
};


//Privados
const agregarRecursosProducto = async (recursos, IdProducto) => {
  try {
    let recursosCreados = [];

    const result = await sequelize.transaction(async (transaction) => {
      const nuevosRecursosProducto = [];
      recursosCreados = (
        await Recurso.bulkCreate(recursos, {
          transaction,
        })
      ).map((r) => {
        const { createdAt, updatedAt, ...dataValue } = r.dataValues;
        return dataValue;
      });

      for (recurso of recursosCreados) {
        nuevosRecursosProducto.push({ IdProducto, IdRecurso: recurso.id });
      }

      await ProductoRecurso.bulkCreate(nuevosRecursosProducto, { transaction });
    });

    return recursosCreados;
  } catch (error) {
    throw error;
  }
};

module.exports.productoService = service;
