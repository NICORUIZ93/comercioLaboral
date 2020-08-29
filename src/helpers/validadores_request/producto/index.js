const validadorCrearProducto = require("../producto/crearProductoSchema").crearProductoSchema;
const validadorActualizarProducto = require("../producto/actualizarProductoSchema").actualizarProductoSchema;
const validadorEliminarProducto = require("../producto/eliminarProductoSchema").eliminarProductoSchema;
const validadorObtenerProducto = require("../producto/obtenerProductoSchema").obtenerProductoSchema;
const validadorObtenerProductosPaginado = require("../producto/obtenerProductosPaginadoSchema").obtenerProductosPaginadoSchema;


module.exports = {
    validadorCrearProducto,
    validadorActualizarProducto,
    validadorEliminarProducto,
    validadorObtenerProducto,
    validadorObtenerProductosPaginado
}