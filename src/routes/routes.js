const Rol = require('../constants/roles');

//Controladores
const usuarioController = require("../controllers/usuario");
const productoController = require("../controllers/producto");
const productosTiendaActivaController = require("../controllers/productosTiendaActiva");
const tiendaController = require("../controllers/tienda")
const tiendasActivasController = require("../controllers/tiendasActivas")
const cargarArchivosController = require("../controllers/cargarArchivos")
const autorizacion = require("../services/autorizacion");
const categoriaController = require("../controllers/categoria")
const plataformaPagosController = require("../controllers/plataformaPagos")
const mensajeController = require("../controllers/mensaje")
const listaController = require("../controllers/listas")
const pedidoController = require("../controllers/pedidos")
const calificacionTiendaController = require("../controllers/calificacionTienda")
const estadisticasController = require("../controllers/estadisticas")
const enviosController = require("../controllers/envios")
const feriaController = require("../controllers/feria")
const notificacionController = require("../controllers/notificacion")

//Validadores
const { validadorObtenerPorId, obtenerPorUuidSchema } = require("../helpers/validadores_request/genericos");
const { validadorCrearUsuario, validadorActualizarUsuario, validadorEliminarUsuario, validadorcrearUsuariosMasivo } = require("../helpers/validadores_request/usuario");
const { validadorCrearProducto, validadorActualizarProducto, validadorEliminarProducto, validadorObtenerProductosPaginado, validadorBuscarProductosPaginado, validadorRecursosProducto, validadorProductosPorTiendaPaginado, validadorObtenerProductosTiendaFeria, validadorEliminarRecursoProducto} = require("../helpers/validadores_request/producto");
const { validadorCrearTienda, validadorActualizarTienda, validadorEliminarTienda, validadorRecursosTienda, validadorActivarTienda } = require("../helpers/validadores_request/tienda");
const { validadorCrearCategoria, validadorActualizarCategoria, validadorEliminarCategoria } = require("../helpers/validadores_request/categoria");
const { validadorCrearMensaje, validadorEliminarMensaje } = require("../helpers/validadores_request/mensaje");
const { validadorobtenerUrlArchivo } = require("../helpers/validadores_request/archivo");
const { validadorObtenerPreferencia } = require("../helpers/validadores_request/mercadopago");
const { validadorCrearCalificacion, validadorEliminarCalificacion, validadorObtenerCalificacionTienda } = require("../helpers/validadores_request/calificacionTienda");
const { validadorCrearEnvio, validadorActualizarPedidoEnviado } = require("../helpers/validadores_request/envios");
const { validadorActualizarFeria, validadorAsociarTiendasAFeria, validadorCargarFeria, validadorCrearFeria, validadorObtenerFeria, validadorEliminarTiendaDeFeria } = require("../helpers/validadores_request/feria");
const { validadorCrearNotificacion } = require("../helpers/validadores_request/notificacion");



module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Api MultiStore v1",
    })
  })
  
  //Ruta cargue de archivos
  app.post("/api/archivos", cargarArchivosController.cargarArchivos)
  app.post("/api/archivos/modelo", cargarArchivosController.cargarArchivosPorModelo)
  app.get("/api/archivos/url", validadorobtenerUrlArchivo, cargarArchivosController.obtenerUrlRecurso)

  //Login
  app.post("/api/login", autorizacion.login)

  //Rutas Usuarios
  app.get("/api/usuarios", /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.obtenerUsuarios)
  app.get("/api/usuarios/activos", /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.obtenerUsuariosActivos)
  app.get("/api/usuario/:id", validadorObtenerPorId, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.obtenerUsuario)
  app.post("/api/usuario", validadorCrearUsuario, usuarioController.crearUsuario)
  app.post("/api/usuarios/empleados", validadorcrearUsuariosMasivo, usuarioController.crearEmpleadosMasivo)
  app.get("/api/usuarios/tienda/empleados/:id", validadorObtenerPorId, usuarioController.obtenerVendedoresPorTienda)
  app.put("/api/usuario", validadorActualizarUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.actualizarUsuario)
  //app.delete("/api/usuario/:id", validadorEliminarUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.eliminarUsuario)
  app.delete("/api/usuario/:id", validadorEliminarUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.eliminarUsuarioLogico)

  //Rutas Tiendas
  app.get("/api/tiendas", tiendaController.obtenerTiendas)
  app.get("/api/tienda/:id", validadorObtenerPorId, tiendaController.obtenerTienda)
  app.get("/api/tienda/porIdUsuario/:id", validadorObtenerPorId, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.obtenerTiendaPorUsuario)
  app.post("/api/tienda", validadorCrearTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.crearTienda)
  app.post("/api/tienda/activar", validadorActivarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.activarTienda)
  app.post("/api/tienda/recursos", validadorRecursosTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.cargarRecursosTienda)
  app.put("/api/tienda", validadorActualizarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.actualizarTienda)
  app.delete("/api/tienda/:id", validadorEliminarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.eliminarTienda)
  app.get("/api/tienda/saldoMP/:id", validadorObtenerPorId, tiendaController.obtenerSaldoMP)
  app.get("/api/tienda/refescarAutorizacion/:id", validadorObtenerPorId, tiendaController.actualizarAutorizacion)

  //Rutas TIendas solo activas
  app.get("/api/activa/tiendas", tiendasActivasController.obtenerTiendas)
  app.get("/api/activa/tienda/:id", validadorObtenerPorId, tiendasActivasController.obtenerTienda)
  app.get("/api/activa/tienda/porIdUsuario/:id", validadorObtenerPorId, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendasActivasController.obtenerTiendaPorUsuario)

  //Rutas Productos
  app.get("/api/productos", productoController.obtenerProductos)
  app.get("/api/productos/masvendidos", productoController.obtenerProductosMasVendidos)
  app.get("/api/productos/oferta", productoController.obtenerProductosOferta)
  app.get("/api/productos/tienda/feria", validadorObtenerProductosTiendaFeria, productoController.obtenerProductosPorTiendaFeria)
  app.get("/api/productos/feria/:id", validadorObtenerPorId, productoController.obtenerProductosPorFeria)
  app.get("/api/productos/paginado", validadorObtenerProductosPaginado, productoController.obtenerProductosPaginado)
  app.get("/api/productos/buscar/paginado", validadorBuscarProductosPaginado, productoController.buscarProductosPaginado)
  app.get("/api/productos/tienda/paginado", validadorProductosPorTiendaPaginado, productoController.obtenerProductosPorTiendaPaginado)
  app.get("/api/productos/tienda/:id", validadorObtenerPorId, productoController.obtenerProductosPorTienda)
  app.get("/api/productos/pedido/:id", validadorObtenerPorId, productoController.obtenerProductosPorPedido)
  app.get("/api/producto/:id", validadorObtenerPorId, productoController.obtenerProducto)
  app.post("/api/producto", validadorCrearProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.crearProducto)
  app.post("/api/producto/recursos", validadorRecursosProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.cargarRecursosProducto)
  app.put("/api/producto", validadorActualizarProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.actualizarProducto)
  app.delete("/api/producto/:id", validadorEliminarProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.eliminarProducto)
  app.delete("/api/producto/recurso", validadorEliminarRecursoProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.eliminarRecursoProducto)
  


  //Rutas productos solo de tiendas activas
  app.get("/api/activa/productos", productosTiendaActivaController.obtenerProductos)
  app.get("/api/activa/productos/masvendidos", productosTiendaActivaController.obtenerProductosMasVendidos)
  app.get("/api/activa/productos/oferta", productosTiendaActivaController.obtenerProductosOferta)
  app.get("/api/activa/productos/paginado", validadorObtenerProductosPaginado, productosTiendaActivaController.obtenerProductosPaginado)
  app.get("/api/activa/productos/buscar/paginado", validadorBuscarProductosPaginado, productosTiendaActivaController.buscarProductosPaginado)
  app.get("/api/activa/productos/tienda/paginado", validadorProductosPorTiendaPaginado, productosTiendaActivaController.obtenerProductosPorTiendaPaginado)
  app.get("/api/activa/productos/tienda/:id", validadorObtenerPorId, productosTiendaActivaController.obtenerProductosPorTienda)
  app.get("/api/activa/productos/pedido/:id", validadorObtenerPorId, productosTiendaActivaController.obtenerProductosPorPedido)
  app.get("/api/activa/producto/:id", validadorObtenerPorId, productosTiendaActivaController.obtenerProducto)

  //Rutas Categorias
  app.get("/api/categorias", categoriaController.obtenerCategorias)
  app.get("/api/categorias/activas", categoriaController.obtenerCategoriasActivas)
  app.get("/api/categoria/:id", validadorObtenerPorId, categoriaController.obtenerCategoria)
  app.post("/api/categoria", validadorCrearCategoria, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ categoriaController.crearCategoria)
  app.put("/api/categoria", validadorActualizarCategoria, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ categoriaController.actualizarCategoria)
  app.delete("/api/categoria/:id", validadorEliminarCategoria, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ categoriaController.eliminarCategoria)

  //Rutas Mensajes
  app.get("/api/mensajes/porIdTienda/:id", validadorObtenerPorId, mensajeController.obtenerMensajesPorTienda)
  app.get("/api/mensajes/porIdProducto/:id", validadorObtenerPorId, mensajeController.obtenerMensajesPorProducto)
  app.get("/api/mensajes/porIdMensaje/:id", validadorObtenerPorId, mensajeController.obtenerMensajesPorId)
  app.post("/api/mensaje", validadorCrearMensaje, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ mensajeController.crearMensaje)
  app.delete("/api/mensaje/:id", validadorEliminarMensaje, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ mensajeController.eliminarMensaje)

  //Rutas Plataforma de pagos
  app.get("/api/pago/bancos", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ listaController.obtenerListaBancos)
  app.post("/api/pago/mp/preferencia", validadorObtenerPreferencia, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ plataformaPagosController.obtenerPreferenciaMercadoPago)
  app.post("/api/pago/mp/webHooks", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ plataformaPagosController.webHooks)
  //app.get("/api/pago/mp/test/:id", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ plataformaPagosController.test)

  //Rutas listas
  app.get("/api/lista/ciudades", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ listaController.obtenerListaCiudades)
  app.get("/api/lista/ciudades/departamento/:id", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ listaController.obtenerListaCiudadesPorDepartamento)
  app.get("/api/lista/departamentos", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ listaController.obtenerListaDepartamentos)

  //Rutas pedidos
  app.get("/api/pedido/:id", validadorObtenerPorId, pedidoController.obtenerPedido)
  app.get("/api/pedidos", pedidoController.obtenerPedidos)
  app.get("/api/pedidos/tienda/:id", validadorObtenerPorId, pedidoController.obtenerPedidosPorTienda)
  app.get("/api/compras/tienda/:id", validadorObtenerPorId, pedidoController.obtenerComprasPorTienda)
  app.get("/api/compras/usuario/:id", validadorObtenerPorId, pedidoController.obtenerComprasPorUsuario)
  app.get("/api/pedido/estado/:id", obtenerPorUuidSchema, pedidoController.obtenerEstadoPedido)

  //Rutas Calificacion tienda
  app.get("/api/calificacion/tienda/:id", validadorObtenerCalificacionTienda,/*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ calificacionTiendaController.obtenerCalificacionesPorTienda)
  app.post("/api/calificacion/tienda", validadorCrearCalificacion, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ calificacionTiendaController.crearCalificaciontienda)

  //Rutas totales
  app.get("/api/estadisticas/totales",/*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ estadisticasController.obtenerTotales)
  app.get("/api/estadisticas/totales/porIdTienda/:id", validadorObtenerPorId, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ estadisticasController.obtenerTotalesPorTienda)
  app.get("/api/estadisticas/totales/ventas/porIdTienda/:id", validadorObtenerPorId, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ estadisticasController.obtenerTotalesVentasPorTienda)

  //Rutas Envios
  app.get("/api/envio/:id",/*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ enviosController.obtenerEnvio)
  app.post("/api/envio/estado", validadorCrearEnvio, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ enviosController.actualizarEstadoEnvio)
  app.post("/api/envio/estado/enviado", validadorActualizarPedidoEnviado, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ enviosController.actualizarEstadoAEnviado)

  //Rutas Feria
  app.put("/api/feria", validadorActualizarFeria, feriaController.actualizarFeria)
  app.post("/api/feria/asociarTiendas", validadorAsociarTiendasAFeria, feriaController.asociarTiendasAFeria)
  app.post("/api/feria/eliminarTienda", validadorEliminarTiendaDeFeria, feriaController.eliminarTiendaDeFeria)
  app.post("/api/feria/cargarProductos", validadorCargarFeria, feriaController.cargarProductosAFeria)
  app.post("/api/feria", validadorCrearFeria, feriaController.crearFeria)
  app.get("/api/feria/:id", validadorObtenerPorId, feriaController.obtenerFeria)
  app.get("/api/feria/porIdTienda/:id", validadorObtenerPorId, feriaController.obtenerFeriaPorTienda)
  app.get("/api/ferias", feriaController.obtenerFerias)
  app.get("/api/feriaActiva", feriaController.obtenerFeriaActiva)
  app.get("/api/feriax/test", feriaController.enviar)

  //Rutas Notificaciones
  app.post("/api/notificacion/confirmar/:id", obtenerPorUuidSchema, notificacionController.confirmarNotificacion)
  app.post("/api/notificacion", validadorCrearNotificacion, notificacionController.crearNotificacion)

}
