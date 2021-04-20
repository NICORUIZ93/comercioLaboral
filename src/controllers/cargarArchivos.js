const { recursosService } = require("../services/recursos");
const { cargarArchivosService } = require("../services/cargarArchivosS3");

module.exports = {

  async cargarArchivos(req, res) {
    try {

      const respuestaCargue = await recursosService.crearRecurso(req, res);

      return res.status(200).json(respuestaCargue);

    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async cargarArchivosPorModelo(req, res) {
    try {

      const respuestaCargue = await recursosService.crearRecursoPorModelo(req, res);

      return res.status(200).json(respuestaCargue);

    } catch (e) {
      return res.status(500).send(e);
    }
  },
  async obtenerUrlRecurso(req, res) {
    try {

      const arrArchivos = req.body.archivos;
      let urls = [];

      urls = await Promise.all(arrArchivos.map(async (archivo) => {
        return {
          url: await cargarArchivosService.obtenerUrlRecurso(archivo.key, archivo.type),
          key: archivo.key,
          type: archivo.type
        }
      }));

      return res.status(200).json(urls);

    } catch (e) {
      return res.status(500).send(e);
    }
  },

};





