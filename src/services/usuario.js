const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const Rol = require("../db/models").Rol;
const Recurso = require("../db/models").Recurso;
const { Op } = require("sequelize");
const _Rol = require("../constants/roles");
const { recursosService } = require( "../services/recursos");

const service = {
  async obtenerUsuarios() {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["contrasena"] },
        include: [
          Rol,
          {
            model: Recurso,
            as: "Foto",
            attributes: ["id", "nombre", "key", "extension"],
          },
        ],
      });
      return usuarios;
    } catch (error) {
      console.log(error.message);
      return `Error ${error}`;
    }
  },
  async obtenerUsuario(idUsuario) {
    try {
      const usuario = (
        await Usuario.findByPk(idUsuario, {
          attributes: { exclude: ["contrasena"] },
          include: [
            Rol,
            {
              model: Recurso,
              as: "Foto",
              attributes: ["id", "nombre", "key", "extension"],
            },
          ],
        })
      ).get({ plain: true });

      return usuario;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearUsuario(nuevoUsuario) {
    try {
      let usuario = { ...nuevoUsuario };
      let recurso;

      if (nuevoUsuario.contrasena) {
        usuario.contrasena = bcrypt.hashSync(nuevoUsuario.contrasena, 10);
        usuario.IdRol = _Rol.VendedorID;
      }

      const {imagen, ...usuarioSinImagen} = usuario;

      if (imagen) {
        recurso = await recursosService.crearRecursoTabla({
          url: imagen
        });
      }

      const resultadocreate = (await Usuario.create(usuarioSinImagen)).get({
        plain: true,
      });

      if(recurso){
        resultadocreate.IdFoto = recurso.id;
      }
  
      const { contrasena, ...usuarioSinContrasena } = resultadocreate;

      return usuarioSinContrasena;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearEmpleadosMasivo(nuevosUsuarios) {
    try {
      const resultadocreate = (await Usuario.bulkCreate(nuevosUsuarios));

      return resultadocreate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarUsuario(usuario) {
    try {
      const resultadoUpdate = await Usuario.update(usuario, {
        where: {
          id: usuario.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarUsuario(idUsuario) {
    try {
      const resultadoDestroy = await Usuario.destroy({
        where: {
          id: idUsuario,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerUsuarioPorParametros(parametrosWhere) {
    try {
      const usuario = await Usuario.findOne({
        where: {
          [Op.or]: parametrosWhere,
        },
        include: [Rol]
      });

      return usuario ? usuario.dataValues : null;

    } catch (error) {
       throw error;
    }
  },
  
};



module.exports.usuarioService = service;
