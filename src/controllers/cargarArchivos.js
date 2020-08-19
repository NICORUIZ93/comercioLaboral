const { recursosService } = require( "../services/recursos");

module.exports = {

  async cargarArchivos(req, res) {
    try {
      
      const respuestaCargue = await recursosService.crearRecurso(req, res);

      return res.status(200).json(respuestaCargue);

    } catch (e) {
      return res.status(500).send(e);
    }
  },

};





