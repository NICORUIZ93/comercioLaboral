const { tiendaService } = require( "../services/tienda");

module.exports = {

  async obtenerTiendas(req, res) {
    try {
      const tiendas = await tiendaService.obtenerTiendas();
      return res.status(200).json(tiendas);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async obtenerTienda(req, res) {
    try {
      const idTienda  = req.params.id;

      const tiendas = await tiendaService.obtenerTienda(idTienda);
      return res.status(200).json(tiendas);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  async crearTienda(req, res) {
    try {

      const nuevaTienda = await tiendaService.crearTienda(req.body);

      return res.status(200).json(nuevaTienda);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },

  async actualizarTienda(req, res) {
    try {

      const nuevaTienda = await tiendaService.actualizarTienda(req.body);

      return res.status(200).json(nuevaTienda);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },

  async eliminarTienda(req, res) {
    try {

      const idTienda = req.params.id;
      const nuevaTienda = await tiendaService.eliminarTienda(idTienda);

      return res.status(200).json(nuevaTienda);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }


};





