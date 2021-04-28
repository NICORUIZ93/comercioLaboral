const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const Rol = require("../db/models").Rol;
const Recurso = require("../db/models").Recurso;
const UsuariosTienda = require("../db/models").UsuariosTienda;
const empleadosTiendas = require('../db/models').empleadosTiendas;
const codigosRestablecimiento = require('../db/models').codigosRestablecimiento
const { Op } = require("sequelize");
const _Rol = require("../constants/roles");
const { recursosService } = require("../services/recursos");
var sequelize = require("../db/models").sequelize;
const nodemailer = require("nodemailer");

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
          "$UsuariosTienda.IdTienda$": idTienda,
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
      //aca
      const { contrasena, ...usuarioSinContrasena } = resultadocreate;
      //const progreso = await Usuario.update({ 'progreso': 1 }, {
      //  where: {
      //    'correo': nuevoUsuario.correo
      //  }
      //})
      //console.log(progreso)
      return usuarioSinContrasena;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
  ,
  async crearEmpleadoTienda(nuevoUsuario) {
    try {

      if (nuevoUsuario.contrasena) {
        nuevoUsuario.contrasena = bcrypt.hashSync(nuevoUsuario.contrasena, 10);
        nuevoUsuario.IdRol = _Rol.VendedorID;
      }

      let resultadov = await empleadosTiendas.findAll({
        where: {
          'correo': nuevoUsuario.correo
        }
      });

      if (resultadov) {
        throw Error("El empleado ya existe");
      }
      let codigo = await codigosRestablecimiento.findAll({
        where: {
          'codigo': nuevoUsuario.codigo
        }
      })
      if ((JSON.parse(JSON.stringify(codigo)))[0] != undefined) {
        let id = (JSON.parse(JSON.stringify(codigo)))[0]['IdTienda']
        nuevoUsuario.idTienda = id
        let cu = await this.crearUsuario(nuevoUsuario);
        let resultadocreate = await empleadosTiendas.create(nuevoUsuario);
        //aca
        //const ut = (await UsuariosTienda.findAll({ where: { 'IdTienda': nuevoUsuario.idTienda, 'esAdministrador': true } })).dataValues;
        //const progreso = await Usuario.update({ 'progreso': 4 }, {
        //  where: {
        //    'id': ut.IdUsuario
        //  }
        //})
        //console.log(progreso)
        return resultadocreate;
      } else {
        throw Error("El codigo no es valido");
      }

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  }
  ,
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
            esAdministrador: false,
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
      /*
      const resultadoDestroy = await Usuario.destroy({
        where: {
          id: idUsuario,
        },
      });
      
      return resultadoDestroy;
      */
      const resultadoUpdate = await Usuario.update({ activo: false }, {
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
  async procesoRegistro(idUsuario) {
    try {
      const resultado = await Usuario.findAll({
        attributes: ['progreso'],
        where: {
          id: idUsuario,
        },
      });

      return resultado;
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
      if (!parametrosWhere) return await Usuario.count();

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
  async empleadosTienda(req) {
    try {
      const e = await empleadosTiendas.findAll({
        attributes: { exclude: ["contrasena"] },
        where: {
          'idTienda': req.params.id
        }
      });

      return e;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async empleadoId(req) {
    try {
      const e = await empleadosTiendas.findAll({
        attributes: { exclude: ["contrasena"] },
        where: {
          'id': req.params.id
        }
      });

      return e;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async emailRegistroEmpleado(correoReceptor) {
    try {
      let u = "no.reply.comerzio@gmail.com";
      let p = "Imdsas2021.*";
      let numero = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      console.log(correoReceptor.body.IdTienda)
      let new_code = await codigosRestablecimiento.create({ 'codigo': numero, 'IdTienda': correoReceptor.body.IdTienda })
      console.log(new_code)
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: u,
          pass: p // naturally, replace both with your real credentials or an application-specific password
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Comerzio" <no.reply.comerzio@gmail.com>', // sender address
        to: correoReceptor.body.correo, // list of receivers
        subject: "Registro  - Comerzio", // Subject line
        html: `
        <h1> Comerzio</h1> <br></br>
        <h2> Codigo comerzio para registro</h2> <br></br>
        <h2> ${numero} </h2>
        `, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      setTimeout(async function () {
        await codigosRestablecimiento.destroy({
          where: {
            'codigo': numero
          }
        });
      }, 1200000)
      return "correo enviado"
    } catch (error) {
      console.log(`${error}`);
    }
  },
  async pruebas(req) {
    try {
      //aca
      const ut = await UsuariosTienda.findAll({ where: { 'IdTienda': req.body.idTienda, 'esAdministrador': true } });
     // const progreso = await Usuario.update({ 'progreso': 4 }, {
     //   where: {
     //     'id': ut.IdUsuario
     //   }
     // })
      //console.log(ut.IdUsuario)
      return ut;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.usuarioService = service;
