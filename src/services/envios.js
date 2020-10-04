const Envio = require("../db/models").Envio;

const service = {
  async obtenerEnvios() {
    try {
      const ciudades = await Envio.findAll();

      return ciudades;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async crearEnvio(nuevoEnvio) {
    try {
      let resultadocreate = await Envio.create(nuevoEnvio);

      return resultadocreate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerEnvio(idEnvio) {
    try {
      const Envio = (await Envio.findByPk(idEnvio)).get({ plain: true });

      return Envio;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerUltimoEstadoEnvio(parametrosWhere) {
    try {
      const estados = 
        (await Envio.findAll({
          attributes: ["estado"],
          where: parametrosWhere,
        })).map(atributo => { return atributo.estado });

      console.log("estados");
      console.log(estados);
      const ultimoEstado = Math.max(...estados);
      console.log("el ultimo estado es");
      console.log(ultimoEstado);
      return ultimoEstado;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async actualizarEnvio(Envio) {
    try {
      const resultadoUpdate = await Envio.update(Envio, {
        where: {
          id: Envio.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async eliminarEnvio(idEnvio) {
    try {
      const resultadoDestroy = await Envio.destroy({
        where: {
          id: idEnvio,
        },
      });

      return resultadoDestroy;
    } catch (error) {
      return `Error ${error}`;
    }
  },
};

module.exports.envioService = service;
