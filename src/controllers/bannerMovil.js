const { bannerMovil } = require("../services/bannerMovil");

module.exports = {
  async obtenerBannerMovil(req, res) {
    try {
      const ItemsBannerMovil = await bannerMovil.obtenerBannerMovil();
      return res.status(200).json(ItemsBannerMovil);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerCategoriasActivas(req, res) {
    try {
      const categorias = await categoriaService.obtenerCategoriasActivas();
      return res.status(200).json(categorias);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerCategoria(req, res) {
    try {
      const idCategoria = req.params.id;

      const categorias = await categoriaService.obtenerCategoria(idCategoria);
      return res.status(200).json(categorias);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },

  async crearCategoria(req, res) {
    try {
      const nuevaCategoria = await categoriaService.crearCategoria(req.body);

      return res.status(200).json(nuevaCategoria);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },

  async actualizarCategoria(req, res) {
    try {
      const nuevaCategoria = await categoriaService.actualizarCategoria(
        req.body
      );

      return res.status(200).json(nuevaCategoria);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },

  async eliminarCategoria(req, res) {
    try {
      const idCategoria = req.params.id;
      const nuevaCategoria = await categoriaService.eliminarCategoria(
        idCategoria
      );

      return res.status(200).json(nuevaCategoria);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
};
