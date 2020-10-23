const { feriaService } = require( "../services/feria");

console.log('inicia proceso de notificación de feria');

await feriaService.enviarNotificacion();

console.log('finaliza proceso de notificación de feria');