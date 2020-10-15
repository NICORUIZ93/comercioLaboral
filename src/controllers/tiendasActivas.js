const { tiendaService } = require( "../services/tienda");

module.exports = {

  async obtenerTiendas(req, res) {
    try {
      const tiendas = await tiendaService.obtenerTiendas(true);
      return res.status(200).json(tiendas);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerTienda(req, res) {
    try {
      const idTienda  = req.params.id;

      const tiendas = await tiendaService.obtenerTienda(idTienda, true);
      return res.status(200).json(tiendas);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerTiendaPorUsuario(req, res) {
    try {
      const idUsuario  = req.params.id;

      const tienda = await tiendaService.obtenerTiendaPorUsuario(idUsuario, true);
      return res.status(200).json(tienda);
    } catch (e) {
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  }
  
};





