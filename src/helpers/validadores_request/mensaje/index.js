const validadorCrearMensaje = require("../mensaje/crearMensajeSchema").crearMensajeSchema;
const validadorEliminarMensaje = require("../mensaje/eliminarMensajeSchema").eliminarMensajeSchema;
const validadorObtenerMensaje = require("../mensaje/obtenerMensajesSchema").obtenerMensajeSchema;


module.exports = {
    validadorCrearMensaje,
    validadorEliminarMensaje,
    validadorObtenerMensaje
}