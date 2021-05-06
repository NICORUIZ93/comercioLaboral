const Feria = require("../db/models").Feria;
const Tienda = require("../db/models").Tienda;
const Producto = require("../db/models").Producto;
const Recurso = require("../db/models").Recurso;
const TiendaFeria = require("../db/models").TiendaFeria;
const Feriaproductos = require("../db/models").Feriaproductos;
const { productoService } = require("./producto");
const notificacionService = require("./notificaciones");
const nodemailer = require("nodemailer");
const { emailsFeria } = require('./emailsFeria')
const _temasNotificacion = require("../constants/temasNotificacion");
var sequelize = require("../db/models").sequelize;
const UsuariosTienda = require('../db/models').UsuariosTienda
const Usuario = require('../db/models').Usuario
const { Op } = require("sequelize");

const service = {
  async obtenerFerias() {
    try {
      const ferias = await Feria.findAll();

      return ferias;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeriaPorTienda(idTienda) {
    try {

      const feria = await TiendaFeria.findOne({
        where: {
          idTienda: idTienda,
          estado: true,
          '$Ferium.activa$': true
        },
        include: [
          {
            model: Feria,
            attributes: [
              "activa"            
            ],
            required: false
          },
        ],
        attributes: ["idFeria"],
      });

      if(!feria) throw Error('La tienda no esta asociada a ningúna feria');

      return { idFeria: feria.idFeria };

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  
  async crearFeria(nuevaFeria) {
    try {
      nuevaFeria.activa = false;
      let resultadocreate = await Feria.create(nuevaFeria);
      this.enviarNotificacion();
      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async asociarTiendasAFeria(tiendas) {
    try {
      let resultadocreate = await TiendaFeria.bulkCreate(tiendas.tiendas);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarTiendaDeFeria(idTienda, idFeria) {
    try {
      let resultado = await TiendaFeria.update({ estado: false }, {
        where: {
          idTienda,
          idFeria
        }
      });

      return resultado;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async cargarFeria(productos, urlVideo, idTienda, idFeria) {
    try {
      const nuevosProductosFeria = [];

      await sequelize.transaction(async (transaction) => {

        for (producto of productos) {
         await Producto.update({ feria: true, valorFeria: producto.valor }, {
            where: {
              id: producto.id,
            },
            transaction
          });

          const nuevoProducto = { idFeria, idProducto: producto.id, idTienda };
          const existe = await Feriaproductos.findOne({where: nuevoProducto});
          if(existe) await Feriaproductos.update(nuevoProducto, { where: nuevoProducto, transaction });
          else await Feriaproductos.create(nuevoProducto, { transaction });
   
        }

        if (urlVideo) {
          await TiendaFeria.update(
            { urlVideo: urlVideo },
            {
              where: {
                idTienda: idTienda,
              },
              transaction
            }
          );
        }

      });

      return true;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeria(idFeria) {
    try {
      let feria = await Feria.findByPk(idFeria, {});

      if(!feria) throw Error('No existen ferias activas');

      feria = feria.dataValues;

      const tiendaFeria = await TiendaFeria.findAll({
        where: {
          idFeria: feria.id,
          estado: true,
        },
        include: [
          {
            model: Tienda,
            attributes: [
              "id",
              "nombre",
              "direccion",
              "telefono",
              "descripcion",
            ],
            required: false,
            include: [
              {
                model: Recurso,
                as: "Recursos",
                attributes: [
                  "id",
                  "nombre",
                  "key",
                  "url",
                  "extension",
                  "url",
                  "prioridad",
                ],
                through: {
                  attributes: [],
                },
                required: false
              },
            ],
          },
        ],
        attributes: ["idTienda", "urlVideo"],
      });

      feria.tiendas = tiendaFeria.map((tiendaf) => {
        const tiendav = tiendaf.dataValues;
        let tienda = tiendav.Tienda.dataValues;
        tienda.video = tiendav.urlVideo;
        return tienda;
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeriaActiva() {
    try {
      let feria = 
        await Feria.findOne({
          where: {
            activa: true,
          },
        });

      if(!feria) throw Error('No existen ferias activas');

      feria = feria.dataValues;

      const tiendaFeria = await TiendaFeria.findAll({
        where: {
          idFeria: feria.id,
          estado: true,
        },
        include: [
          {
            model: Tienda,
            attributes: [
              "id",
              "nombre",
              "direccion",
              "telefono",
              "descripcion",
            ],
            include: [
              {
                model: Recurso,
                as: "Recursos",
                attributes: [
                  "id",
                  "nombre",
                  "key",
                  "url",
                  "extension",
                  "url",
                  "prioridad",
                ],
                through: {
                  attributes: [],
                },
                required: false
              },
            ],
            required: false
          },
        ],
        attributes: ["idTienda", "urlVideo"],
      });

      feria.tiendas = tiendaFeria.map((tiendaf) => {
        const tiendav = tiendaf.dataValues;
        let tienda = tiendav.Tienda.dataValues;
        tienda.video = tiendav.urlVideo;
        return tienda;
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeriaPorParametros(parametrosWhere) {
    try {
      const feria = await Feria.findOne({
        where: {
          [Op.or]: parametrosWhere,
        },
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerFeriaPorFecha(campo, fecha) {
    try {
      const feria = await Feria.findOne({
        where: sequelize.where(
          sequelize.fn("date", sequelize.col(campo)),
          "=",
          fecha
        ),
      });

      return feria;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarFeria(feria, id) {
    try {
      const resultadoUpdate = await Feria.update(feria, {
        where: {
          'id': id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarFeria(idFeria) {
    try {
      const resultadoDestroy = await Feria.destroy({
        where: {
          id: idFeria,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async emailsF(req) {
    try {
      let u = "no.reply.comerzio@gmail.com";
      let p = "Imdsas2021.*";

      const tienda = await UsuariosTienda.findAll({
        where : {
          'IdTienda' : req.body.IdTienda 
        }
      })

      let correo = "";

      if ((JSON.parse(JSON.stringify(tienda)))[0] != undefined) {
        const usuario = await Usuario.findAll({ 
          where : {
            'id' : (JSON.parse(JSON.stringify(tienda)))[0]['IdUsuario']
          }
         })
         if ((JSON.parse(JSON.stringify(usuario)))[0] != undefined) {
           correo = (JSON.parse(JSON.stringify(usuario)))[0]['correo']
         } else {
           return "No se encontro un usuario"
         }
      } else {
        return "No se encontro una tienda"
      }
      
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
        to: correo , // list of receivers
        subject: `Invitacion Feria - Comerzio`, // Subject line
        html: await emailsFeria(req.body.nombreFeria,req.body.fechaInicio,req.body.fechaFinal), // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      return "correo enviado"
    } catch (error) {
      console.log(`${error}`);
    }
  },
  async enviarNotificacion() {
    try {
      const fechaActual = new Date().toISOString().replace(/\T.+/, "");
      console.log(fechaActual)
      let feria = await this.obtenerFeriaPorFecha("fechaInicio", fechaActual);
      if (feria) {
        await notifcar(_temasNotificacion.InicioFeria);
        if (!feria.activa)
          await this.actualizarFeria({ activa: true }, feria.id);
        return;
      }

      feria = await this.obtenerFeriaPorFecha("fechaFin", fechaActual);

      if (feria) {
        await notifcar(_temasNotificacion.FinFeria);
        if (feria.activa) {
          await this.actualizarFeria({ activa: false }, feria.id);

          await TiendaFeria.update({ estado: false }, {
            where: {
              idFeria: feria.id
            }
          });

          await productoService.actualizarProductoPorParametros(
            { feria: false },
            { feria: true }
          );
        }
        return;
      }
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

//privados
const notifcar = async (tema) => {
  try {
    const notificacion = await notificacionService.obtenerNotificacionPorParametros(
      [{ tema: tema }]
    );

    if (notificacion) {
      return;
    } else {
      await new notificacionService().enviarNotificacion(tema, {}, "moviles");
    }
  } catch (error) {
    throw error;
  }
};
module.exports.feriaService = service;
