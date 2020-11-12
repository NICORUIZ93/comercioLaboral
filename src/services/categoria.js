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
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerCategoriasActivas() {
    try {
      const categorias = await Categoria.findAll({
        where: { IdPadre: { [Op.is]: null }, estado: true },
        include: [{ model: Categoria, as: "SubCategorias" }],
      });

      const categoriasFiltradas = categorias.map(cat => {
        const subCategoriasActivas = cat.SubCategorias.filter(c => c.estado);
        cat.SubCategorias = subCategoriasActivas;
        return cat;
      });

      return categoriasFiltradas;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerCategoria(idCategoria) {
    try {

      const categoria = await Categoria.findByPk(idCategoria, {
        include: [{ model: Categoria, as: "SubCategorias" }]
      });

      return categoria;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearCategoria(nuevaCategoria) {
    try {
             
      const resultadocreate = (await Categoria.create(nuevaCategoria)).get({plain:true});

      return resultadocreate;

    } catch (error) {
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
    }
  },
  
}

module.exports.categoriaService = service;