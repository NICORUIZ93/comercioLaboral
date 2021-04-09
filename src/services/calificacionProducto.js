const calificacionProductos = require("../db/models").calificacionProductos;
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;

const service = {
    
    
    async calificacionProductos(nuevaCalificacion) {
      try {
        let resultadocreate = await calificacionProductos.create(
          nuevaCalificacion
        );
  
        return resultadocreate;
      } catch (error) {
        console.log(`${error}`);
        throw error;
      }
    },
    async obtenerCalificacionesProducto(params) {
      try {
        const calificaciones = await calificacionProductos.findAll({
          where: {
            [Op.or]: params,
          }
        });
  
        return calificaciones;
      } catch (error) {
        console.log(`${error}`);
        throw error;
      }
    },
    async obtenerPromedioProducto(params) {
      try {
        const calificaciones = await calificacionProductos.findAll({
          attributes: [
            [sequelize.fn('AVG', sequelize.col('calificacion')), 'promedio_calificacion'],
            ], where: {
              [Op.or]: params,
            }
          
        });
  
        return calificaciones;
      } catch (error) {
        console.log(`${error}`);
        throw error;
      }
    }
   
  };
  
module.exports.calificacionProductos = service;
