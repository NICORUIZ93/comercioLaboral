const { cargarArchivosService } = require( "../services/cargarArchivosService");

module.exports = {

  async cargarArchivos(req, res) {
    try {

      const respuestaCargue = await cargarArchivosService.cargarArchivosS3(req, res);

      return res.status(200).json(respuestaCargue);

    } catch (e) {
      return res.status(500).send(e);
    }
  },

};





