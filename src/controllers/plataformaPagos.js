const { plataformaPagosService } = require( "../services/plataformaPagos");

module.exports = {

  async obtenerBancos(req, res) {
    try {
      const bancos = await plataformaPagosService.obtenerBancos();
      return res.status(200).json(bancos);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  
};





