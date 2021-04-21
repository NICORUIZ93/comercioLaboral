const validadorCrearUsuario = require("../usuario/crearUsuarioSchema").crearUsuarioSchema;
const validadorActualizarUsuario = require("../usuario/actualizarUsuarioSchema").actualizarUsuarioSchema;
const validadorEliminarUsuario = require("../usuario/eliminarUsuarioSchema").eliminarUsuarioSchema;
const validadorObtenerUsuario = require("../usuario/obtenerUsuarioSchema").obtenerUsuarioSchema;
const validadorcrearUsuariosMasivo = require("../usuario/crearUsuariosMasivoSchema").crearUsuariosMasivoSchema;
const validadorCrearEmpleadoTienda = require('./crearEmpleadoSchema').crearEmpleadoSchema;


module.exports = {
    validadorCrearUsuario,
    validadorActualizarUsuario,
    validadorEliminarUsuario,
    validadorObtenerUsuario,
    validadorcrearUsuariosMasivo,
    validadorCrearEmpleadoTienda
}