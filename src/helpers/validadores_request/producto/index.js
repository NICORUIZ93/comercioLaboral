const validadorCrearProducto = require("../producto/crearProductoSchema").crearProductoSchema;
const validadorActualizarProducto = require("../producto/actualizarProductoSchema").actualizarProductoSchema;
const validadorEliminarProducto = require("../producto/eliminarProductoSchema").eliminarProductoSchema; 
const validadorObtenerProducto = require("../producto/obtenerProductoSchema").obtenerProductoSchema;
const validadorObtenerProductosPaginado = require("../producto/obtenerProductosPaginadoSchema").obtenerProductosPaginadoSchema;
const validadorObtenerProductosTiendaFeria = require("../producto/obtenerProductosTiendaFeriaSchema").obtenerProductosTiendaFeriaSchema;
const validadorBuscarProductosPaginado = require("../producto/buscarProductosPaginadoSchema").buscarProductosPaginadoSchema;
const validadorRecursosProducto = require("../producto/cargarRecursosProductoSchema").cargarRecursosProductoSchema;
const validadorProductosPorTiendaPaginado = require("../producto/obtenerProductosPorTiendaPaginadoSchema").obtenerProductosPorTiendaPaginadoSchema; 
const validadorEliminarRecursoProducto = require("../producto/eliminarRecursoProductoSchema").eliminarRecursoProductoSchema;
const validadorCalificacionProducto = require("../producto/calificacionProductoSchema").calificacionProductoSchema;
const validadorObtenerCalificacionProducto = require('../producto/obtenerCalificacionProductoSchema').obtenerCalificacionProductoSchema;
const validarObtenerPromedioProducto = require('../producto/obtenerPromedioProductoSchema').obtenerPromedioProductoSchema;
const validadorCrearComentarioProducto = require('../producto/crearComentarioSchema').crearComentarioSchema;
module.exports = {
    validadorCrearProducto,
    validadorActualizarProducto,
    validadorEliminarProducto,
    validadorObtenerProducto,
    validadorObtenerProductosPaginado,
    validadorBuscarProductosPaginado,
    validadorRecursosProducto,
    validadorProductosPorTiendaPaginado,
    validadorObtenerProductosTiendaFeria,
    validadorEliminarRecursoProducto,
    validadorCalificacionProducto,
    validadorObtenerCalificacionProducto,
    validarObtenerPromedioProducto,
    validadorCrearComentarioProducto
}