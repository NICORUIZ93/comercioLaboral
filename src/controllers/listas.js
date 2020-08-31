const { listasService } = require( "../services/listas");

module.exports = {


  async obtenerLista(req, res) {
    try {
      //const idLista = req.params.id;
      const lista = await listasService.obtenerLista(1);
      
      return res.status(200).json(lista);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  
};





