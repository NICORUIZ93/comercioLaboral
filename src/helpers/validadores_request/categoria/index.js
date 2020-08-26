const validadorCrearCategoria = require("../categoria/crearCategoriaSchema").crearCategoriaSchema;
const validadorActualizarCategoria = require("../categoria/actualizarCategoriaSchema").actualizarCategoriaSchema;
const validadorEliminarCategoria = require("../categoria/eliminarCategoriaSchema").eliminarCategoriaSchema;
const validadorObtenerCategoria = require("../categoria/obtenerCategoriaSchema").obtenerCategoriaSchema;


module.exports = {
    validadorCrearCategoria,
    validadorActualizarCategoria,
    validadorEliminarCategoria,
    validadorObtenerCategoria
}