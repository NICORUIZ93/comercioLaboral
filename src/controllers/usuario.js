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
  async obtenerUsuario(req, res) {
    try {
      const idUsuario = req.params.idUsuario;
      const usuario = await usuarioService.obtenerUsuario(idUsuario);

      return res.status(200).json(usuario);
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

      const idUsuario = req.params.id;
      const nuevoUsuario = await usuarioService.eliminarUsuario(idUsuario);

      return res.status(200).json(nuevoUsuario);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }


};





