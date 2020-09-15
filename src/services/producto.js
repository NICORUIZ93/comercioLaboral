const Producto = require("../db/models").Producto;
const DetallePedido = require("../db/models").DetallePedido;
const TiendaProducto = require("../db/models").TiendaProducto;
const Categoria = require("../db/models").Categoria;
const Tienda = require("../db/models").Tienda;
const Recurso = require("../db/models").Recurso;
const ProductoRecurso = require("../db/models").ProductoRecurso;
var sequelize = require("../db/models").sequelize;
const paginador = require("../helpers/paginacion/paginador");
const { Op } = require("sequelize");

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
            attributes: [
              "id",
              "nombre",
              "key",
              "extension",
              "url",
              "prioridad",
            ],
            through: {
              attributes: [],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return productos.map((p) => {
        const { Tiendas, ...producto } = p.dataValues;
        producto.IdTienda = Tiendas[0].id;
        producto.NombreTienda = Tiendas[0].nombre;
        //producto.Recurso = Recursos[0];
        return producto;
      });
    } catch (error) {
      throw error;
    }
  },
  async obtenerProductosPorParametros(parametrosWhere) {
    try {
      const productos = await Producto.findAll({
        where: {
          [Op.or]: parametrosWhere,
        },
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
            attributes: [
              "id",
              "nombre",
              "key",
              "extension",
              "url",
              "prioridad",
            ],
            through: {
              attributes: [],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return productos;
    } catch (error) {
      throw error;
    }
  },
  async obtenerProductosPaginado(page, limit, offset) {
    try {
      const productos = await Producto.findAndCountAll({
        limit,
        offset,
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
            attributes: [
              "id",
              "nombre",
              "key",
              "extension",
              "url",
              "prioridad",
            ],
            through: {
              attributes: [],
            },
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      const porductosFiltrados = productos.rows.map((p) => {
        const { Tiendas, ...producto } = p.dataValues;
        producto.IdTienda = Tiendas[0].id;
        producto.NombreTienda = Tiendas[0].nombre;
        //producto.Recurso = Recursos[0];
        return producto;
      });
      productos.rows = porductosFiltrados;

      return paginador.paginarDatos(productos, page, limit);
    } catch (error) {
      throw error;
    }
  },
  async obtenerProductosPorTiendaPaginado(idTienda, paginacion) {
    try {
      const { limit, offset, pagina } = paginacion;

      const productos = await Producto.findAndCountAll({
        limit,
        offset,
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
            attributes: [
              "id",
              "nombre",
              "key",
              "extension",
              "url",
              "prioridad",
            ],
            through: {
              attributes: [],
            },
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      const porductosFiltrados = productos.rows.map((p) => {
        const { Tiendas, ...producto } = p.dataValues;
        producto.IdTienda = Tiendas[0].id;
        producto.NombreTienda = Tiendas[0].nombre;
        //producto.Recurso = Recursos[0];
        return producto;
      });

      productos.rows = porductosFiltrados.filter(
        (f) => f.IdTienda === parseInt(idTienda)
      );
      productos.count = productos.rows.length;

      return paginador.paginarDatos(productos, pagina, limit);
    } catch (error) {
      throw error;
    }
  },
  async buscarProductosPaginado(busqueda, paginacion) {
    try {
      const { limit, offset, pagina } = paginacion;

      const productos = await Producto.findAndCountAll({
        limit,
        offset,
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
            attributes: [
              "id",
              "nombre",
              "key",
              "extension",
              "url",
              "prioridad",
            ],
            through: {
              attributes: [],
            },
          },
        ],
        where: {
          [Op.or]: [
            {
              nombre: {
                [Op.like]: `%${busqueda}%`,
              },
            },
            {
              descripcion: {
                [Op.like]: `%${busqueda}%`,
              },
            },
          ],
        },
        order: [["createdAt", "ASC"]],
      });

      const porductosFiltrados = productos.rows.map((p) => {
        const { Tiendas, ...producto } = p.dataValues;
        producto.IdTienda = Tiendas[0].id;
        producto.NombreTienda = Tiendas[0].nombre;
        //producto.Recurso = Recursos[0];
        return producto;
      });

      productos.rows = porductosFiltrados;

      return paginador.paginarDatos(productos, pagina, limit);
    } catch (error) {
      throw error;
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
            attributes: ["id", "nombre"],
          },
          {
            model: Recurso,
            as: "Recursos",
            attributes: [
              "id",
              "nombre",
              "key",
              "extension",
              "url",
              "prioridad",
            ],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!producto) throw Error("No existe el producto indicado");

      const { Tiendas, ...productoFiltrado } = producto.dataValues;
      productoFiltrado.IdTienda = Tiendas[0].id;
      productoFiltrado.NombreTienda = Tiendas[0].nombre;
      //productoFiltrado.Recurso = Recursos[0];

      return productoFiltrado;
    } catch (error) {
      throw error;
    }
  },
  async crearProducto(idTienda, nuevoProducto) {
    try {
      let resultadoNuevoProducto;

      const tienda = await Tienda.findByPk(idTienda);
      if (!tienda) throw Error("la tienda no existe");

      await sequelize.transaction(async (t) => {
        resultadoNuevoProducto = (
          await Producto.create(nuevoProducto, {
            transaction: t,
          })
        ).get({
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
      });

      if (nuevoProducto.imagenes) {
        resultadoNuevoProducto.imagenes = await this.cargarRecursosProducto(
          resultadoNuevoProducto.id,
          nuevoProducto.imagenes
        );
      }

      return resultadoNuevoProducto;
    } catch (error) {
      throw error;
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
      throw error;
    }
  },
  async cargarRecursosProducto(idProducto, recursos) {
    try {
      let recursosAgregadosProducto = [];

      const producto = await Producto.findByPk(idProducto);
      if (!producto) throw Error("el producto no existe");

      if (recursos) {
        recursosAgregadosProducto = await agregarRecursosProducto(
          recursos,
          idProducto
        );
      }

      return recursosAgregadosProducto;
    } catch (error) {
      throw error;
    }
  },
  async obtenerProductosMasVendidos() {
    try {
      const productos = await DetallePedido.findAll({
        limit: 10,
        group: ["IdProducto"],
        attributes: ["IdProducto", [sequelize.fn("COUNT", "IdProducto"), "count"]],
        order: [[sequelize.literal("count"), "DESC"]],
        raw: true,
      });

      const idProductos = productos.map(producto => { return producto.IdProducto });

      const masVendidos = (await this.obtenerProductosPorParametros([{ id: idProductos }])).map(p => { 
        const producto = productos.find(producto => producto === p.id);
        return { producto: p, cantidad: producto.count }
       });

      return masVendidos;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

//Privados
const agregarRecursosProducto = async (recursos, IdProducto) => {
  try {
    let recursosCreados = [];

    await sequelize.transaction(async (transaction) => {
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
