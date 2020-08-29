const Categoria = require("../db/models").Categoria;
const { Op } = require("sequelize");

const service = {
  async obtenerCategorias() {
    try {
      const categorias = await Categoria.findAll({
        where: { IdPadre: { [Op.is]: null } },
        include: [{ model: Categoria, as: "SubCategorias" }],
      });
      return categorias;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  
  async obtenerCategoria(idCategoria) {
    try {

      const categoria = await Categoria.findByPk(idCategoria, {
        include: [{ model: Categoria, as: "SubCategorias" }]
      });

      return categoria;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async crearCategoria(nuevaCategoria) {
    try {
             
      const resultadocreate = (await Categoria.create(nuevaCategoria)).get({plain:true});

      return resultadocreate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarCategoria(categoria) {
    try {
             
    const resultadoUpdate = (await Categoria.update(categoria, {
        where: {
          id: categoria.id
        }
      }));

      return resultadoUpdate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarCategoria(idCategoria) {
    try {
             
    const resultadoDestroy = (await Categoria.destroy({
        where: {
          id: idCategoria
        }
      }));

      return resultadoDestroy;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  
}

module.exports.categoriaService = service;