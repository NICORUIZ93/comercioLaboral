const { CalificacionTiendaService } = require( "../services/calificacionTienda");

module.exports = {


  async obtenerCalificacionTienda(req, res) {
    try {
      const idCalificacionTienda = req.params.id;
      const CalificacionTienda = await CalificacionTiendaService.obtenerCalificacionTienda(idCalificacionTienda);
      
      return res.status(200).json(CalificacionTienda);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerCalificacionesTiendas(req, res) {
    try {
      //const idCalificacionTienda = req.params.id;
      const CalificacionTienda = await CalificacionTiendaService.obtenerCalificacionTiendas();
      
      return res.status(200).json(CalificacionTienda);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerCalificacionesPorTienda(req, res) {
    try {
      const idTienda = req.params.id;
      const CalificacionTienda = await CalificacionTiendaService.obtenerCalificacionPorTienda({ IdTienda:idTienda});
      
      return res.status(200).json(CalificacionTienda);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearCalificaciontienda(req, res) {
    try {

      const nuevoMensaje = await CalificacionTiendaService.crearCalificacionTienda(req.body);

      return res.status(200).json(nuevoMensaje);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  
};





