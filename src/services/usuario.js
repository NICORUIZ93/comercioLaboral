const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const Rol = require("../db/models").Rol;
const Recurso = require("../db/models").Recurso;
const UsuariosTienda = require("../db/models").UsuariosTienda;
const { Op } = require("sequelize");
const _Rol = require("../constants/roles");
const { recursosService } = require("../services/recursos");
var sequelize = require("../db/models").sequelize;

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
            attributes: ["id", "nombre", "key", "extension", "url"],
          },
        ],
      });
      return usuarios;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerUsuariosPorParametros(parametrosWhere) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["contrasena"] },
        where: {
          [Op.or]: parametrosWhere,
        },
        include: [
          Rol,
          {
            model: Recurso,
            as: "Foto",
            attributes: ["id", "nombre", "key", "extension", "url"],
          },
        ],
        order: [
          ['createdAt', 'DESC']
        ],
      });

      return usuarios;
      
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerVendedoresPorTienda(idTienda) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["contrasena"] },
        where: {
          "$UsuariosTienda.IdTienda$":idTienda,
          "$UsuariosTienda.esAdministrador$": false
        },
        include: [
          {
            model: UsuariosTienda,
            attributes: ["IdTienda", "esAdministrador"],
          },
          Rol,
          {
            model: Recurso,
            as: "Foto",
            attributes: ["id", "nombre", "key", "extension", "url"],
          },
        ],
        order: [
          ['createdAt', 'DESC']
        ],
      });

      return usuarios;
      
    } catch (error) {
      console.log(`${error}`);
      throw error;
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
              attributes: ["id", "nombre", "key", "extension", "url"],
            },
          ],
        })
      ).get({ plain: true });

      return usuario;
    } catch (error) {
      console.log(`${error}`);
      throw error;
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

      const { imagen, ...usuarioSinImagen } = usuario;
      const { IdFoto, ...usuarioSinFoto } = usuario;

      if (imagen) {
        recurso = await recursosService.crearRecursoTabla({
          url: imagen,
        });
      }

      if (recurso) {
        usuarioSinFoto.IdFoto = recurso.id;
      }

      usuarioSinFoto.activo = true;

      const resultadocreate = (await Usuario.create(usuarioSinFoto)).get({
        plain: true,
      });

      const { contrasena, ...usuarioSinContrasena } = resultadocreate;

      return usuarioSinContrasena;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearEmpleadosMasivo(idTienda, nuevosUsuarios) {
    try {
      let nuevosUsuariosConRecurso = [];
      let recursos;
      let resultadoCreateNuevosEmpleados = [];

      const imagenesUsuarios = nuevosUsuarios.map((imgUsuario) => {
        const { imagen, ...usuarioSinImagen } = imgUsuario;
        return { url: imagen };
      });

      if (imagenesUsuarios.length > 0) {
        recursos = await recursosService.crearRecursosMasivoTabla(
          imagenesUsuarios
        );

        if (recursos.length > 0) {
          nuevosUsuariosConRecurso = nuevosUsuarios.map((usuario) => {
            const recursoImagen = recursos.find(
              (recurso) => recurso.url === usuario.imagen
            );
            usuario.IdFoto = recursoImagen ? recursoImagen.id : null;
            return usuario;
          });
        }
      }

      await sequelize.transaction(async (t) => {

        resultadoCreateNuevosEmpleados = await Usuario.bulkCreate(
          nuevosUsuariosConRecurso, { transaction: t }
        );

        const nuevosUsuariosTienda = resultadoCreateNuevosEmpleados.map(nuevoEmpleado => {
          
          return {
            IdUsuario: nuevoEmpleado.id,
            IdTienda: idTienda,
            esAdministrador : false,
          };

        });

        await UsuariosTienda.bulkCreate(
          nuevosUsuariosTienda,
          { transaction: t }
        );

      });


      return resultadoCreateNuevosEmpleados;

    } catch (error) {
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarUsuarioLogico(idUsuario) {
    try {
      const resultadoUpdate = await Usuario.update({ activo: false }, {
        where: {
          id: idUsuario,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerUsuarioPorParametros(parametrosWhere) {
    try {
      const usuario = await Usuario.findOne({
        where: {
          [Op.or]: parametrosWhere,
        },
        include: [Rol],
      });

      return usuario ? usuario.dataValues : null;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async contarUsuarioPorParametros(parametrosWhere) {
    try {
      if(!parametrosWhere) return await Usuario.count();
      
      const numeroDeUsuarios = await Usuario.count({
        where: {
          [Op.and]: parametrosWhere,
        }
      });

      return numeroDeUsuarios;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.usuarioService = service;
