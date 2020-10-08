const Envio = require("../db/models").Envio;

const service = {
  async obtenerEnvios() {
    try {
      const ciudades = await Envio.findAll();

      return ciudades;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async crearEnvio(nuevoEnvio) {
    try {
      let resultadocreate = await Envio.create(nuevoEnvio);

      return resultadocreate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerEnvio(idEnvio) {
    try {
      const Envio = (await Envio.findByPk(idEnvio)).get({ plain: true });

      return Envio;
    } catch (error) {
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarEstadoEnvio(envio) {
    try {

      const { idPedido, estado } = envio;

      const estadoActual = await this.obtenerUltimoEstadoEnvio({
        idPedido: idPedido,
      });

      console.log("estado actual");
      console.log(estadoActual);
      const estadoSiguiente = estadoActual + 1;

      if (estado != estadoSiguiente)
        throw Error("El estado al que trata de actualizar no es correcto");

      const nuevoEnvio = await this.crearEnvio(envio);

      return nuevoEnvio;
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async actualizarEnvio(envio) {
    try {
      const resultadoUpdate = await Envio.update(envio, {
        where: {
          id: Envio.id,
        },
      });

      return resultadoUpdate;
    } catch (error) {
      console.log(`${error}`);
      throw error;
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
      console.log(`${error}`);
      throw error;
    }
  },
};

module.exports.envioService = service;
