const { estadisticasService } = require( "../services/estadisticas");

module.exports = {

  async obtenerTotales(req, res) {
    try {
      const totales = await estadisticasService.obtenerTotales();
      return res.status(200).json(totales);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerTotalProductosPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const totales = await estadisticasService.obtenerTotalesProductosPorTienda(idTienda);
      return res.status(200).json(totales);
    } catch (e) {
      res.status(500).send(e);
    }
  },

};





