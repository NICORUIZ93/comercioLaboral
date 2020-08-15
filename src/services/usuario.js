const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const Rol = require("../db/models").Rol;

const service = {
  async obtenerUsuarios() {
    try {

      const usuarios = await Usuario.findAll({ raw: false, include: [Rol] } );

      return usuarios.map(u => {
        delete u.contrasena;
        return u;
      });

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async obtenerUsuario(idUsuario) {
    try {

      const usuario = (await Usuario.findByPk(idUsuario)).get({plain:true});
      delete usuario.contrasena;

      return usuario;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async crearUsuario(nuevoUsuario) {
    try {
             
      let usuario = {...nuevoUsuario};
      usuario.contrasena = bcrypt.hashSync(nuevoUsuario.contrasena, 10);

      const resultadocreate = (await Usuario.create(usuario)).get({plain:true});

      delete resultadocreate.contrasena;

      return resultadocreate;

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