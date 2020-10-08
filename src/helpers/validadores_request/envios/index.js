const validadorCrearEnvio = require("../envios/crearEnvioSchema").crearEnvioSchema;
const validadorActualizarPedidoEnviado = require("../envios/actualizarPedidoEnviadoSchema").actualizarPedidoEnviadoSchema;

module.exports = {
    validadorCrearEnvio,
    validadorActualizarPedidoEnviado
}