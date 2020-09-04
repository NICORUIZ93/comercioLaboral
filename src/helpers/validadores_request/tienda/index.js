const validadorCrearTienda = require("../tienda/crearTiendaSchema").crearTiendaSchema;
const validadorActualizarTienda = require("../tienda/actualizarTiendaSchema").actualizarTiendaSchema;
const validadorEliminarTienda = require("../tienda/eliminarTiendaSchema").eliminarTiendaSchema;
const validadorObtenerTienda = require("../tienda/obtenerTiendaSchema").obtenerTiendaSchema;
const validadorRecursosTienda = require("../tienda/cargarRecursosTiendaSchema").cargarRecursosTiendaSchema;

module.exports = {
    validadorCrearTienda,
    validadorActualizarTienda,
    validadorEliminarTienda,
    validadorObtenerTienda,
    validadorRecursosTienda
}