const {respuestaTienda} = require('../services/respuestaTienda')

module.exports = {

    async respuestaTienda(req, res) {
      try {
  
        const nuevoMensaje = await respuestaTienda.respuestaTienda(req.body);
  
        return res.status(200).json(nuevoMensaje);
  
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    },
    async respuestas(req, res) {
      try {
  
        const nuevoMensaje = await respuestaTienda.respuestas(req.params);
  
        return res.status(200).json(nuevoMensaje);
  
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    }
    
    
  };