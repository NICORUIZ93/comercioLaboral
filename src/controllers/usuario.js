const { usuarioService } = require( "../services/usuario");

module.exports = {

  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.obtenerUsuarios();
      return res.status(200).json(usuarios);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  async crearUsuario(req, res) {
    try {

      const nuevoUsuario = await usuarioService.crearUsuario(req.body);

      return res.status(200).json(nuevoUsuario);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },

  async actualizarUsuario(req, res) {
    try {

      const nuevoUsuario = await usuarioService.actualizarUsuario(req.body);

      return res.status(200).json(nuevoUsuario);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  },

  async eliminarUsuario(req, res) {
    try {

      const nuevoUsuario = await usuarioService.eliminarUsuario(req.body);

      return res.status(200).json(nuevoUsuario);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }



};





