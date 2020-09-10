const { usuarioService } = require("../services/usuario");
const Rol = require("../constants/roles");

module.exports = {
  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.obtenerUsuarios();
      return res.status(200).json(usuarios);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async obtenerUsuario(req, res) {
    try {
      const idUsuario = req.params.id;
      const usuario = await usuarioService.obtenerUsuario(idUsuario);

      return res.status(200).json(usuario);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearUsuario(req, res) {
    try {
      const existeElUsuario = await usuarioService.obtenerUsuarioPorParametros([
        { correo: req.body.correo },
      ]);

      console.log(existeElUsuario);

      if (existeElUsuario) {
        throw Error("El usuario ya existe");
      }

      if (req.body.IdRol === Rol.AdministradorID) {
        throw Error("Rol invalido");
      }

      const nuevoUsuario = await usuarioService.crearUsuario(req.body);

      return res.status(200).json(nuevoUsuario);
    } catch (e) {
      console.log(e);
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async crearEmpleadosMasivo(req, res) {
    try {
      const usuariosACrear = req.body.usuarios;
      const idTienda = req.body.IdTienda;

      for (const usuario of usuariosACrear) {
        const existeElUsuario = await usuarioService.obtenerUsuarioPorParametros(
          [{ correo: usuario.correo }]
        );
        if (existeElUsuario)
          throw Error(`El usuario ${usuario.correo} ya existe`);
      }

      if (usuariosACrear.some((usuario) => usuario.IdRol !== Rol.EmpleadoID)) {
        throw Error("Rol invalido, solo rol empleado");
      }

      const nuevoUsuario = await usuarioService.crearEmpleadosMasivo(
        idTienda, usuariosACrear
      );

      return res.status(200).json(nuevoUsuario);
    } catch (e) {
      console.log(e);
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async actualizarUsuario(req, res) {
    try {
      const nuevoUsuario = await usuarioService.actualizarUsuario(req.body);

      return res.status(200).json({ code: 200, mesaage: 'usuario actualizado' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },

  async eliminarUsuario(req, res) {
    try {
      const idUsuario = req.params.id;
      const nuevoUsuario = await usuarioService.eliminarUsuario(idUsuario);

      return res.status(200).json({ code: 200, mesaage: 'usuario eliminado' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
  async eliminarUsuarioLogico(req, res) {
    try {
      const idUsuario = req.params.id;
      await usuarioService.eliminarUsuarioLogico(idUsuario);
      return res.status(200).json({ code: 200, mesaage: 'usuario eliminado (desactivado)' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ code: 500, mesaage: `${e}` });
    }
  },
};
