const Producto = require("../db/models").Producto;
const DetallePedido = require("../db/models").DetallePedido;
const TiendaProducto = require("../db/models").TiendaProducto;
const TiendaFeria = require("../db/models").TiendaFeria;
const Feriaproductos = require("../db/models").Feriaproductos;
const Categoria = require("../db/models").Categoria;
const Tienda = require("../db/models").Tienda;
const Pedido = require("../db/models").Pedido;
const Recurso = require("../db/models").Recurso;
const ProductoRecurso = require("../db/models").ProductoRecurso;
var sequelize = require("../db/models").sequelize;
const paginador = require("../helpers/paginacion/paginador");
const { Op } = require("sequelize");

const service = {
  async obtenerProductos(estadoTienda = false) {
    try {
      const whereCondition = estadoTienda
        ? {
            "$Tiendas.estado$": true,
          }
        : {};

      const productos = await Producto.findAll({
        where: whereCondition,
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
  async obtenerProductosPorTienda(idTienda, estadoTienda = false) {
    try {
      const whereCondition = estadoTienda
        ? {
            "$Tiendas.id$": idTienda,
            "$Tiendas.estado$": true,
          }
        : {
            "$Tiendas.id$": idTienda,
          };

      const productos = await Producto.findAll({
        where: whereCondition,
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
  async obtenerProductosTiendaFeria(idTienda, idFeria) {
    try {
      const productos = await Feriaproductos.findAll({
        where: { idTienda, idFeria },
        include: [
          {
            model: Producto,
            include: [
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
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return productos.map((prod) => {
        return prod.Producto;
      });
    } catch (error) {
      throw error;
    }
  },
  async obtenerProductosFeria(idFeria) {
    try {
      const productos = await Feriaproductos.findAll({
        where: { idFeria },
        include: [
          {
            model: Producto,
            include: [
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
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return productos.map((prod) => {
        return prod.Producto;
      });
    } catch (error) {
      throw error;
    }
  },
  async obtenerProductosPorParametros(parametrosWhere, estadoTienda = false) {
    try {
      const whereCondition = estadoTienda
        ? {
            [Op.or]: parametrosWhere,
            "$Tiendas.estado$": true,
          }
        : {
            [Op.or]: parametrosWhere,
          };

      let productos = await Producto.findAll({
        where: whereCondition,
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
  async obtenerProductosPaginado(page, limit, offset, estadoTienda = false) {
    try {
      const whereCondition = estadoTienda
        ? {
            estado: estadoTienda,
          }
        : {};

      let productos = await Producto.findAndCountAll({
        limit,
        offset,
        subQuery: false,
        include: [
          {
            model: Tienda,
            where: whereCondition,
          },
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
  async obtenerProductosPorTiendaPaginado(
    idTienda,
    paginacion,
    estadoTienda = false
  ) {
    try {
      const { limit, offset, pagina } = paginacion;

      const whereCondition = estadoTienda
        ? {
            id: idTienda,
            estado: estadoTienda,
          }
        : {
            id: idTienda,
          };

      //where: { '$Tienda.estado$': true },
      let productos = await Producto.findAndCountAll({
        limit,
        offset,
        subQuery: false,
        include: [
          {
            model: Tienda,
            where: whereCondition,
          },
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

      /*
      productos.rows = porductosFiltrados.filter(
        (f) => f.IdTienda === parseInt(idTienda)
      );
      productos.count = productos.rows.length;
      */

      return paginador.paginarDatos(productos, pagina, limit);
    } catch (error) {
      throw error;
    }
  },
  async buscarProductosPaginado(busqueda, paginacion, estadoTienda = false) {
    try {
      const { limit, offset, pagina } = paginacion;

      const whereCondition = estadoTienda
        ? {
            estado: estadoTienda,
          }
        : {};

      const productos = await Producto.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Tienda,
            where: whereCondition,
          },
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
  async obtenerProducto(idProducto, estadoTienda = false) {
    try {
      const whereCondition = estadoTienda
        ? {
            "$Tiendas.estado$": estadoTienda,
          }
        : {};

      const producto = await Producto.findByPk(idProducto, {
        where: whereCondition,
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

        await Categoria.update(
          { estado: true },
          {
            where: {
              id: nuevoProducto.IdCategoria,
            },
            transaction: t,
          }
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
  async actualizarProducto(producto, id) {
    try {
      const resultadoUpdate = await Producto.update(producto, {
        where: {
          id: id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarProductoPorParametros(producto, parametros) {
    try {
      const resultadoUpdate = await Producto.update(producto, {
        where: parametros,
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarProductoPorId(producto, id) {
    try {
      const resultadoUpdate = await Producto.update(producto, {
        where: {
          id: id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarProducto(idProducto) {
    try {
      const producto = await Producto.findByPk(idProducto);
      const idCategoria = producto.IdCategoria;

      await sequelize.transaction(async (transation) => {
        await Producto.destroy({
          where: {
            id: idProducto,
          },
          transation,
        });

        await TiendaProducto.destroy({
          where: {
            IdProducto: idProducto,
          },
          transation
        });

        const hayProducto = await Producto.findOne({
          where: { IdCategoria: idCategoria },
        });

        if (!hayProducto) {
          await Categoria.update(
            { estado: false },
            {
              where: {
                id: idCategoria,
              },
              transaction,
            }
          );
        }
      });

      return true;
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
        attributes: [
          "IdProducto",
          [sequelize.fn("COUNT", "IdProducto"), "count"],
        ],
        order: [[sequelize.literal("count"), "DESC"]],
        raw: true,
      });

      const idProductos = productos.map((producto) => {
        return producto.IdProducto;
      });

      const masVendidos = (
        await this.obtenerProductosPorParametros([{ id: idProductos }])
      ).map((p) => {
        const producto = productos.find(
          (producto) => producto.IdProducto === p.id
        );
        return { producto: p, cantidad: producto.count };
      });

      return masVendidos;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerProductosPorPedido(idPedido) {
    try {
      const productos = await DetallePedido.findAll({
        attributes: ["IdProducto", "cantidad", "valor"],
        where: { IdPedido: idPedido },
        raw: true,
      });

      const pedido = await Pedido.findByPk(idPedido, {
        attributes: ["IdTienda", "valorTotal"],
      });

      const idsProductos = productos.map((producto) => {
        return producto.IdProducto;
      });

      const productosConCantidad = (
        await this.obtenerProductosPorParametros([{ id: idsProductos }])
      ).map((p) => {
        const producto = productos.find(
          (producto) => producto.IdProducto === p.id
        );
        const { Tiendas, ...productoSinTienda } = p.dataValues;
        return {
          producto: productoSinTienda,
          cantidad: producto.cantidad,
          valorTotal: producto.valor,
          IdTienda: pedido.IdTienda,
        };
      });

      return productosConCantidad;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async contarProductoPorParametros(parametrosWhere) {
    try {
      if (!parametrosWhere) return await Producto.count();

      const numeroDeProductos = await Producto.count({
        where: {
          [Op.or]: parametrosWhere,
        },
      });

      return numeroDeProductos;
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
