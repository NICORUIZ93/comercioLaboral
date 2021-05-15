const Ciudad = require("../db/models").Ciudad;
const Departamento = require("../db/models").Departamento;
var sequelize = require("../db/models").sequelize;
const { Op } = require("sequelize");
const axios = require('axios').default;

const service = {
  async obtenerListas() {
    try {
      const ciudades = await Ciudad.findAll({
        where: { IdTienda: idTienda, IdMensaje: { [Op.is]: null } },
        include: [{ model: Mensaje, as: "Subciudades" }],
      });

      return ciudades;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerListaCiudadPorDepartamento(departamento) {
    try {
      const ciudades = await Ciudad.findAll({ attributes: ["id", "nombre"], where: { departamento }});
      return ciudades;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerListaCiudades() {
    try {
      const ciudades = await Ciudad.findAll({ attributes: ["id", "nombre", "departamento"] });
      return ciudades;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerListaDepartamentos() {
    try {
      const departamentos = await Departamento.findAll({ attributes: ["id","nombre"] , order: [
        ['createdAt', 'DESC']
      ]});
      return departamentos;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerListaBancos() {
    try {

      const bancos = await axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', {
        language: "es",
        command: "GET_BANKS_LIST",
        merchant: {
           apiLogin: "pRRXKOl8ikMmt9u",
           apiKey: "4Vj8eK4rloUd272L48hsrarnUA"
        },
        test: false,
        bankListInformation: {
           paymentMethod: "PSE",
           paymentCountry: "CO"
        }
     });

     let banks = [
      {"description" : "Aportes en Línea"},
      {"description" : "Asopagos"},
      {"description" : "Banco Agrario de Colombia"},
      {"description" : "Banco AV Villas"},
      {"description" : "Banco BBVA"},
      {"description" : "Banco BCSC"},
      {"description" : "Banco Citibank"},
      {"description" : "Banco Coopcentral"},
      {"description" : "Banco Davivienda"},
      {"description" : "Banco de Bogotá"},
      {"description" : "Banco de la República"},
      {"description" : "Banco de Occidente"},
      {"description" : "Banco Falabella"}, 
      {"description" : "Banco Finandina"},
      {"description" : "Banco GNB Sudameris"},
      {"description" : "Banco ltaú Corpbanca Colombia S.A."},
      {"description" : "Banco Mundo Mujer"},
      {"description" : "Banco Pichincha"},
      {"description" : "Banco Popular"},
      {"description" : "Banco Procredit Colombia"},
      {"description" : "Banco Santander de Negocios Colombia S.A."},
      {"description" : "Banco Serf1nanza"},
      {"description" : "Bancoldex"},
      {"description" : "Bancolombia"},
      {"description" : "Bancoomeva"},
      {"description" : "BNP Paribas Coltefinanciera Compensar"},
      {"description" : "Confiar Cooperativa Financiera"},
      {"description" : "Coofinep Cooperativa Financiera"},
      {"description" : "Cooperativa Financiera Cotrafa"},
      {"description" : "Cooperativa Financiera de Antioquia"},
      {"description" : "Deceval"},
      {"description" : "Dirección del Tesoro Nacional - Regalias"},
      {"description" : "Dirección del Tesoro Nacional"},
      {"description" : "Enlace Operativo S.A."},
      {"description" : "Fedecajas"},
      {"description" : "Financiera Juriscoop"},
      {"description" :"Banco JP Morgan Colombia"},
      {"description" : "Mibanco S.A"},
      {"description" : "Red Multibanca Colpatria"},
      {"description" : "Simple S.A."},

     ]  
     
      return banks;

    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearLista(nuevoMensaje) {
    try {
      let resultadocreate = await Mensaje.create(nuevoMensaje);

      if (resultadocreate.IdMensaje) {
        resultadocreate = await this.obtenerciudadesPorId(
          resultadocreate.IdMensaje
        );
      }

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async eliminarLista(idMensaje) {
    try {
      const resultadoDestroy = await Mensaje.destroy({
        where: {
          id: idMensaje,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.listasService = service;
