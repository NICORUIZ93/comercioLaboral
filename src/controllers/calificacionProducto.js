const {calificacionProductos} = require('../services/calificacionProducto')

module.exports = {

    async calificacionProducto(req, res) {
      try {
  
        const nuevoMensaje = await calificacionProductos.calificacionProductos(req.body);
  
        return res.status(200).json(nuevoMensaje);
  
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    },
    async obtenercalificacionesProductos(req, res) {
      try {
        const IdProducto = req.params.id;
        const calificacionProducto = await  calificacionProductos.obtenerCalificacionesProducto({ IdProducto:IdProducto});
        
        return res.status(200).json(calificacionProducto);
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    },
    async obtenerComentariosProductos(req, res) {
      try {
        const IdProducto = req.params.id;
        const comentariosProducto = await  calificacionProductos.obtenerComentariosProducto({ IdProducto:IdProducto});
        
        return res.status(200).json(comentariosProducto);
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    },
    async obtenerPromedioProducto(req, res) {
      try {
        const IdProducto = req.params.id;
        const calificacionProducto = await  calificacionProductos.obtenerPromedioProducto({ IdProducto:IdProducto});
        
        return res.status(200).json(calificacionProducto);
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    },
    async obtenerComentarios(req, res) {
      try {
        const calificacionProducto = await  calificacionProductos.obtenerComentariosEstado(req);
        
        return res.status(200).json(calificacionProducto);
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    },
    async crearComentario(req, res) {
      try {
        const crearComentario = await  calificacionProductos.crearComentarioProducto(req);
        
        return res.status(200).json(crearComentario);
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: 500, mesaage: `${e}` });
      }
    }
    
    
  };
  