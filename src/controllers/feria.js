const { feriaService } = require( "../services/feria");

module.exports = {


  async obtenerFeria(req, res) {
    try {
      const idFeria = req.params.id;
      const feria = await feriaService.obtenerFeria(idFeria);
      
      return res.status(200).json(feria);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerFeriaActiva(req, res) {
    try {
      const feria = await feriaService.obtenerFeriaActiva();
      
      return res.status(200).json(feria);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerFerias(req, res) {
    try {
      //const idFeria = req.params.id;
      const ferias = await feriaService.obtenerFerias();
      
      return res.status(200).json(ferias);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async actualizarFeria(req, res) {
    try {

      const feria = await feriaService.actualizarFeria(req.body);

      return res.status(200).json({ code: 200, mesaage: 'feria actualizada' });

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async asociarTiendasAFeria(req, res) {
    try {
      const feria = await feriaService.asociarTiendasAFeria(req.body);
      
      return res.status(200).json(feria);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async cargarProductosAFeria(req, res) {
    try {
      const { productos, urlVideo, idTienda } = req.body;
      
      const feria = await feriaService.cargarFeria(productos, urlVideo, idTienda);
      
      return res.status(200).json(feria);
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearFeria(req, res) {
    try {

      const nuevoMensaje = await feriaService.crearFeria(req.body);

      return res.status(200).json(nuevoMensaje);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async enviar(req, res) {
    try {

      console.log('inicia proceso de notificación de feria');

      await feriaService.enviarNotificacion();
      
      console.log('finaliza proceso de notificación de feria');
      
      return res.status(200).json(true);

    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
};





