const { usuarioService } = require("../services/usuario");

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
      const idUsuario = req.params.id;
      const usuario = await usuarioService.obtenerUsuario(idUsuario);

      return res.status(200).json(usuario);
    } catch (e) {
      res.status(500).send(e);
    }
  },
  async crearUsuario(req, res) {
    try {
      const existeElUsuario =
        (await usuarioService.obtenerUsuarioPorParametros([
          { username: req.username },
          { correo: req.correo },
        ])) !== null;

      if (existeElUsuario) {
        throw Error("El usuario ya existe");
      }

      const nuevoUsuario = await usuarioService.crearUsuario(req.body);

      return res.status(200).json(nuevoUsuario);
    } catch (e) {
      console.log(e);
      return res.status(500).send(e.message);
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
  },
};
