const Tienda = require("../db/models").Tienda;
const UsuariosTienda = require("../db/models").UsuariosTienda;
const Usuario = require("../db/models").Usuario;
const TiendaRecurso = require("../db/models").TiendaRecurso;
const Recurso = require("../db/models").Recurso;
var sequelize = require("../db/models").sequelize;
const _Rol = require("../constants/roles");
const { Op } = require("sequelize");
const Mercadopago  = require( "./plataformaPago");

const service = {
  async obtenerTiendas(estadoTienda = false) {
    try {
      const tiendas = await Tienda.findAll({
        where: { estado: estadoTienda },
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
      const tienda = await Tienda.findByPk(idTienda, {
        where: { estado: estadoTienda },
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
      const tienda = await UsuariosTienda.findOne({
        where: { IdUsuario: idUsuario,'$Tiendas.estado$': estadoTienda },
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
      const resultadoDestroy = await Tienda.destroy({
        where: {
          id: idTienda,
        },
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

      return data;

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



module.exports.tiendaService = service;
