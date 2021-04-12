const respuestaTienda = require("../db/models").respuestaTienda;
const { Op } = require("sequelize");
var sequelize = require("../db/models").sequelize;

const service = {
    
    
    async respuestaTienda(params) {
        try {
            let resultadocreate = await respuestaTienda.create(
               params
            );
      
            return resultadocreate;
          } catch (error) {
            console.log(`${error}`);
            throw error;
          }
    },
    async respuestas(params) {
      try {
          let resul = await respuestaTienda.findAll({
            where : {
               'id_calificacion' : params.id   
            }
          })

          return resul;
        } catch (error) {
          console.log(`${error}`);
          throw error;
        }
  }
  };
  
module.exports.respuestaTienda = service;
