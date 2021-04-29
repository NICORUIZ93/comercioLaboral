const Tienda = require("../db/models").Tienda;
const UsuariosTienda = require("../db/models").UsuariosTienda;
const Usuario = require("../db/models").Usuario;
const TiendaRecurso = require("../db/models").TiendaRecurso;
const TiendaProducto = require("../db/models").TiendaProducto;
const Recurso = require("../db/models").Recurso;
var sequelize = require("../db/models").sequelize;
const _Rol = require("../constants/roles");
const { Op } = require("sequelize");
const Mercadopago  = require( "./plataformaPago");
const nodemailer = require("nodemailer");

const service = {
  async obtenerTiendas(estadoTienda = false) {
    try {
  
      const whereCondition = estadoTienda ? {
        estado: estadoTienda
      } :
      {};

      const tiendas = await Tienda.findAll({
        where: whereCondition,
        include: [
          {
            model: Recurso,
            as: "Recursos",
            attributes: ["id", "nombre", "key", "url", "extension", "url", "prioridad"],
            through: {
              attributes: [],
            },
          },
        ],
        order: [
          ['createdAt', 'ASC']
        ],
      });

      return tiendas;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },

  async obtenerTienda(idTienda, estadoTienda = false) {
    try {
      const whereCondition = estadoTienda ? {
        estado: estadoTienda
      } :
      {};

      const tienda = await Tienda.findByPk(idTienda, {
        where: whereCondition,
        include: [
          {
            model: UsuariosTienda,
            as: "UsuariosTiendas",
            attributes: ["id"],
            where: { esAdministrador: false },
            required: false,
            include: [
              {
                model: Usuario,
                as: "Usuario",
                attributes: [
                  "id",
                  "nombre",
                  "apellido",
                  "correo",
                  "IdRol",
                  "IdFoto",
                ],
              },
            ],
          },
          {
            model: Recurso,
            as: "Recursos",
            attributes: ["id", "nombre", "key", "url", "extension", "url", "prioridad"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if(!tienda) throw Error(`No exite la tienda ${idTienda}`);

      const { UsuariosTiendas, ...tiendaSinUsuarios } = tienda.dataValues;

      if (UsuariosTiendas.length > 0) {
        const empleados = UsuariosTiendas.map((usuarioTienda) => {
          return usuarioTienda.Usuario;
        });
        tiendaSinUsuarios.empleados = empleados;
      }

      return tiendaSinUsuarios;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerTiendaPorUsuario(idUsuario, estadoTienda = false) {
    try {
      const whereCondition = estadoTienda ? {
        IdUsuario: idUsuario,'$Tiendas.estado$': estadoTienda
      } :
      {IdUsuario: idUsuario};

      const tienda = await UsuariosTienda.findOne({
        where: whereCondition,
        include: [Tienda],
        order: [
          ['createdAt', 'ASC']
        ],
      });

      if (!tienda) throw Error("No existen tiendas asociadas a el usuario");
      return tienda.Tienda;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async ultimasTiendas() {
    try {
      const tienda = await Tienda.findAll({
          where : {
            'estado' : true
          },
          limit : 5,
          order: [
            ['createdAt', 'DESC']
          ]
      });

      return tienda;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearTienda(idUsuario, nuevaTienda, esAdministrador = false) {
    try {
      let resultadoNuevaTienda;

      if(!nuevaTienda.porcentajeComision) nuevaTienda.porcentajeComision = 15;

      const usuarioQueCreaTienda = await Usuario.findByPk(idUsuario);
      if (!usuarioQueCreaTienda) throw Error("el usuario no existe");

      if (
        usuarioQueCreaTienda.IdRol !== _Rol.VendedorID &&
        usuarioQueCreaTienda.IdRol !== _Rol.AdministradorID
      ) {
        throw Error("el usuario no tiene permisos para crear tiendas");
      }

      await sequelize.transaction(async (t) => {

        nuevaTienda.estado = false; //en false hasta que no se active

        resultadoNuevaTienda = (
          await Tienda.create(nuevaTienda, {
            transaction: t,
          })
        ).get({
          plain: true,
        });

        await UsuariosTienda.create(
          {
            IdUsuario: idUsuario,
            IdTienda: resultadoNuevaTienda.id,
            esAdministrador,
          },
          { transaction: t }
        );
      });

      if (nuevaTienda.imagenes) {
        resultadoNuevaTienda.imagenes = await this.cargarRecursosTienda(
          resultadoNuevaTienda.id,
          nuevaTienda.imagenes
        );
      }
    
      await enviarEmailCreacionTienda(usuarioQueCreaTienda.correo);

      // Progreso
     let consultaProgreso = await Usuario.findAll({ where: { 'id': idUsuario } })
      console.log(consultaProgreso)
      if ((JSON.parse(JSON.stringify(consultaProgreso)))[0] != undefined) {
        if ((JSON.parse(JSON.stringify(consultaProgreso)))[0]['progreso'] >= 7) {
          console.log('Registro completado')
        } else if((JSON.parse(JSON.stringify(consultaProgreso)))[0]['progreso'] == null || (JSON.parse(JSON.stringify(consultaProgreso)))[0]['progreso'] <=6){
          const progreso = await Usuario.update({ 'progreso': 3 }, {
            where: {
              'id': (JSON.parse(JSON.stringify(consultaProgreso)))[0]['id']
            }
          })
          console.log(progreso)
        }
      } else {
        console.log("Error al registrar el progreso")
      }
      return resultadoNuevaTienda;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarTienda(tienda) {
    try {
      const resultadoUpdate = await Tienda.update(tienda, {
        where: {
          id: tienda.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      throw error;
    }
  },
  async eliminarTienda(idTienda) {
    try {
     
      await sequelize.transaction(async (t) => {

        await Tienda.destroy({
          where: {
            id: idTienda,
          },
          transaction: t,
        });

       await TiendaProducto.destroy({
          where: {
            IdTienda: idTienda,
          },
        });
     
      });

      return resultadoDestroy;
    } catch (error) {
      throw error;
    }
  },
  async cargarRecursosTienda(idTienda, recursos) {
    try {
      let recursosAgregadosTienda = [];

      const tienda = await Tienda.findByPk(idTienda);
      if (!tienda) throw Error("la tienda no existe");

      if (recursos) {
        recursosAgregadosTienda = await agregarRecursosTienda(
          recursos,
          idTienda
        );
      }

      return recursosAgregadosTienda;
    } catch (error) {
      throw error;
    }
  },
  async activarTienda(idTienda, codigoMp) {
    try {
      const tienda = (await Tienda.findByPk(idTienda)).dataValues;
      const data = await Mercadopago.obtenerTokenVendedor(codigoMp);

      if ((JSON.parse(JSON.stringify(tienda)))[0] != undefined) {
        console.log((JSON.parse(JSON.stringify(tienda)))[0])
      } else {
        return "Tienda es undefined" 
      }

      tienda.codigoMP = codigoMp;
      tienda.tokenMP = data.access_token;
      tienda.estado = true;
      tienda.publicKeyMP = data.public_key;
      tienda.userIdMP = data.user_id;
      tienda.refreshTokenMP = data.refresh_token;
      
      const resultadoUpdate = await Tienda.update(tienda, {
        where: {
          id: tienda.id,
        },
      });
      //aca
      const ut = await UsuariosTienda.findAll({ where: { 'IdTienda': idTienda, 'esAdministrador': true } });
        if ((JSON.parse(JSON.stringify(ut)))[0] != undefined) {
          let consultaProgreso = await Usuario.findAll({ where: { 'id': (JSON.parse(JSON.stringify(ut)))[0]['IdUsuario'] } })
          if ((JSON.parse(JSON.stringify(consultaProgreso)))[0] != undefined) {
            if ((JSON.parse(JSON.stringify(consultaProgreso)))[0]['progreso'] >= 7) {
              console.log("Registro completo")
            } else if((JSON.parse(JSON.stringify(consultaProgreso)))[0]['progreso'] == null || (JSON.parse(JSON.stringify(consultaProgreso)))[0]['progreso']<=6) {
              const progreso = await Usuario.update({ 'progreso': 7 }, {
                where: {
                  'id': (JSON.parse(JSON.stringify(ut)))[0]['IdUsuario']
                }
              })
              console.log(progreso)
            }
          } else {
             console.log("No se encontro progreso")
          }
        } else {
          return "No existe tienda"
        }

      return resultadoUpdate;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async refrescarAutorizacionMP(idTienda) {
    try {
      const tienda = (await Tienda.findByPk(idTienda)).dataValues;
      const data = await Mercadopago.refescarTokenVendedor(tienda.refreshTokenMP);

      tienda.tokenMP = data.access_token;
      tienda.publicKeyMP = data.public_key;
      tienda.userIdMP = data.user_id;
      tienda.refreshTokenMP = data.refresh_token;
      
      const resultadoUpdate = await Tienda.update(tienda, {
        where: {
          id: tienda.id,
        },
      });

      return resultadoUpdate;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerSaldo(idTienda) {
    try {
      const tienda = (await Tienda.findByPk(idTienda)).dataValues;
      const data = await Mercadopago.obtenerSaldo(tienda.userIdMP, tienda.tokenMP);

      return { 
        montoTotal: data.total_amount, 
        montoAutorizadoParaRetirar: data.available_balance 
      };

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async contarTiendaPorParametros(parametrosWhere) {
    try {
      if(!parametrosWhere) return await Tienda.count();
      
      const numeroDeTiendas = await Tienda.count({
        where: {
          [Op.or]: parametrosWhere,
        }
      });

      return numeroDeTiendas;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

//Privados
const agregarRecursosTienda = async (recursos, IdTienda) => {
  try {
    let recursosCreados = [];

    const result = await sequelize.transaction(async (transaction) => {
      const nuevosRecursosTienda = [];
      recursosCreados = (
        await Recurso.bulkCreate(recursos, {
          transaction,
        })
      ).map((r) => {
        const { createdAt, updatedAt, ...dataValue } = r.dataValues;
        return dataValue;
      });

      for (recurso of recursosCreados) {
        nuevosRecursosTienda.push({ IdTienda, IdRecurso: recurso.id });
      }

      await TiendaRecurso.bulkCreate(nuevosRecursosTienda, { transaction });
    });

    return recursosCreados;
  } catch (error) {
    console.log(`${error}`);
      throw error;
  }
};

const obtenerPromedioCalificaciones = async (calificaciones) => {
  try {
    calificaciones.map((calificacion) => {
      return calificacion.calificacion;
    });

    return nums.reduce((a, b) => a + b) / nums.length;

    return recursosCreados;
  } catch (error) {
    console.log(`${error}`);
      throw error;
  }
};


const enviarEmailCreacionTienda = async (correoReceptor) => {
  try {
    let u = "no.reply.comerzio@gmail.com";
    let p = "Imdsas2021.*";
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
      to: correoReceptor, // list of receivers
      subject: "Notificación de tienda creada - Comerzio", // Subject line
      html: "<b>Felicitaciones su tienda ha sido creada exitosamente en Comerquio, no olvide activar su tienda.</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  } catch (error) {
    console.log(`${error}`);
  }
};


module.exports.tiendaService = service;
