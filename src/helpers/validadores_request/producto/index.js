const validadorCrearProducto = require("../producto/crearProductoSchema").crearProductoSchema;
const validadorActualizarProducto = require("../producto/actualizarProductoSchema").actualizarProductoSchema;
const validadorEliminarProducto = require("../producto/eliminarProductoSchema").eliminarProductoSchema; 
const validadorObtenerProducto = require("../producto/obtenerProductoSchema").obtenerProductoSchema;
const validadorObtenerProductosPaginado = require("../producto/obtenerProductosPaginadoSchema").obtenerProductosPaginadoSchema;
const validadorBuscarProductosPaginado = require("../producto/buscarProductosPaginadoSchema").buscarProductosPaginadoSchema;


module.exports = {
    validadorCrearProducto,
    validadorActualizarProducto,
    validadorEliminarProducto,
    validadorObtenerProducto,
    validadorObtenerProductosPaginado,
    validadorBuscarProductosPaginado
}