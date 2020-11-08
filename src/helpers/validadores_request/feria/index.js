const validadorActualizarFeria = require("../feria/actualizarFeriaSchema").actualizarFeriaSchema;
const validadorAsociarTiendasAFeria = require("../feria/asociarTiendasAFeriaSchema").asociarTiendasAFeriaSchema;
const validadorCargarFeria = require("../feria/cargarFeriaSchema").cargarFeriaSchema;
const validadorCrearFeria = require("../feria/crearFeriaSchema").crearFeriaSchema;
const validadorObtenerFeria = require("../feria/obtenerFeriaSchema").obtenerFeriaSchema;
const validadorEliminarTiendaDeFeria = require("../feria/eliminarTiendaDeFeriaSchema").eliminarTiendaDeFeriaSchema;

module.exports = {
    validadorActualizarFeria,
    validadorAsociarTiendasAFeria,
    validadorCargarFeria,
    validadorCrearFeria,
    validadorObtenerFeria,
    validadorEliminarTiendaDeFeria
}