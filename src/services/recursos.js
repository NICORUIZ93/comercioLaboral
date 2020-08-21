const Recurso = require("../db/models").Recurso;
const TiendaRecurso = require("../db/models").TiendaRecurso;
const ProductoRecurso = require("../db/models").ProductoRecurso;
const { cargarArchivosService } = require( "../services/cargarArchivosService");

const service = {
  async obtenerRecursos() {
    try {

      const usuarios = await Recurso.findAll({ raw: false, include: [Rol] } );

      return usuarios.map(u => {
        delete u.contrasena;
        return u;
      });

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async obtenerRecurso(idUsuario) {
    try {

      const usuario = (await Recurso.findByPk(idUsuario)).get({plain:true});
      delete usuario.contrasena;

      return usuario;

    } catch (error) {
        return `Error ${error}`;
    }
  },
  async crearRecurso(req, res) {
    try {
      
      const resultadocreate =  await agregarRecursos(req, res);

      return resultadocreate;

    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarRecurso(idUsuario) {
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


//Privados
const agregarRecursos = async (req, res) =>
{
  try {

    const tipoRecurso = req.query.tipoRecurso;
    const id = req.query.id; 

    const nuevosRecursos = [];
    const respuestaCargue = await cargarArchivosService.cargarArchivosS3(req, res);

    const recursosCargue = respuestaCargue.recursos;

    for (let i = 0; i < recursosCargue.length; i++) {
      let key = recursosCargue[i].key;
      let extension = recursosCargue[i].extension;
      let nombre = recursosCargue[i].name;

      nuevosRecursos.push({ nombre, key, extension});
    }

    const resultadoBulkRecurso = await Recurso.bulkCreate(nuevosRecursos);

    const resultadoBulkModelo = await agregarRecursosSegunModelo(tipoRecurso, id, resultadoBulkRecurso);

    return resultadoBulkModelo;

  } catch (error) {
    return `Error ${error}`;
  }
};



const agregarRecursosSegunModelo = async (tipoRecurso, id, arrayRecursos) =>
{
  try {

    const nuevosRecursos = [];

    for (let i = 0; i < arrayRecursos.length; i++) {
      let IdRecurso = parseInt(arrayRecursos[i].id);
      let IdModelo = parseInt(id);

      let objRecurso = tipoRecurso === 'tienda' ? { IdTienda: IdModelo, IdRecurso } : { IdProducto: IdModelo, IdRecurso };
      nuevosRecursos.push(objRecurso);
    }

    const modeloAUtilizar = tipoRecurso === 'tienda' ? TiendaRecurso : ProductoRecurso;
    const resultadocreate = await modeloAUtilizar.bulkCreate(nuevosRecursos);

    return resultadocreate;

  } catch (error) {
    return `Error ${error}`;
  }
};



module.exports.recursosService = service;