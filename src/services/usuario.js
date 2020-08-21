const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const Rol = require("../db/models").Rol;

const service = {
  async obtenerUsuarios() {
    try {

      const usuarios = await Usuario.findAll({ include: [Rol] } );

      return usuarios.map(u => {
        const { contrasena, ...usuarioSinContrasena } = u;
        return usuarioSinContrasena;
      });

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async obtenerUsuario(idUsuario) {
    try {

      const usuario = (await Usuario.findByPk(idUsuario)).get({plain:true});

      const { contrasena, ...usuarioSinContrasena } = usuario;

      return usuarioSinContrasena;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async crearUsuario(nuevoUsuario) {
    try {
             
      let usuario = {...nuevoUsuario};
      usuario.contrasena = bcrypt.hashSync(nuevoUsuario.contrasena, 10);

      const resultadocreate = (await Usuario.create(usuario)).get({plain:true});

      const { contrasena, ...usuarioSinContrasena } = resultadocreate;

      return usuarioSinContrasena;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarUsuario(usuario) {
    try {
             
    const resultadoUpdate = (await Usuario.update(usuario, {
        where: {
          id: usuario.id
        }
      }));

      return resultadoUpdate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarUsuario(idUsuario) {
    try {
             
    const resultadoDestroy = (await Usuario.destroy({
        where: {
          id: idUsuario
        }
      }));

      return resultadoDestroy;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  
}

module.exports.usuarioService = service;