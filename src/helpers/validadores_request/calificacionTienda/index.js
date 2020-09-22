const validadorCrearCalificacion = require("../calificacionTienda/crearCalificacionSchema").crearCalificacionSchema;
const validadorEliminarCalificacion = require("../calificacionTienda/eliminarCalificacionSchema").eliminarCalificacionSchema;
const validadorObtenerCalificacionTienda = require("../calificacionTienda/obtenerCalificacionTiendaSchema").obtenerCalificacionTiendaSchema;


module.exports = {
    validadorCrearCalificacion,
    validadorEliminarCalificacion,
    validadorObtenerCalificacionTienda
}