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
     
      return bancos.data.banks;

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
