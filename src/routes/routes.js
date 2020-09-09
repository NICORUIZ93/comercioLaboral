const Rol = require('../constants/roles');

//Controladores
const usuarioController = require("../controllers/usuario");
const productoController = require("../controllers/producto");
const tiendaController = require("../controllers/tienda")
const cargarArchivosController = require("../controllers/cargarArchivos")
const autorizacion = require("../services/autorizacion");
const categoriaController = require("../controllers/categoria")
const plataformaPagosController = require("../controllers/plataformaPagos")
const mensajeController = require("../controllers/mensaje")
const listaController = require("../controllers/listas")

//Validadores
const { validadorObtenerPorId } = require("../helpers/validadores_request/genericos");
const { validadorCrearUsuario, validadorActualizarUsuario, validadorEliminarUsuario, validadorcrearUsuariosMasivo } = require("../helpers/validadores_request/usuario");
const { validadorCrearProducto, validadorActualizarProducto, validadorEliminarProducto, validadorObtenerProductosPaginado, validadorBuscarProductosPaginado, validadorRecursosProducto, validadorProductosPorTiendaPaginado } = require("../helpers/validadores_request/producto");
const { validadorCrearTienda, validadorActualizarTienda, validadorEliminarTienda, validadorRecursosTienda, validadorActivarTienda } = require("../helpers/validadores_request/tienda");
const { validadorCrearCategoria, validadorActualizarCategoria, validadorEliminarCategoria } = require("../helpers/validadores_request/categoria");
const { validadorCrearMensaje, validadorEliminarMensaje } = require("../helpers/validadores_request/mensaje");
const { validadorobtenerUrlArchivo } = require("../helpers/validadores_request/archivo");
const { validadorObtenerPreferencia } = require("../helpers/validadores_request/mercadopago");



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
  app.get("/api/usuario/:id", validadorObtenerPorId, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.obtenerUsuario)
  app.post("/api/usuario", validadorCrearUsuario, usuarioController.crearUsuario)
  app.post("/api/usuarios/empleados", validadorcrearUsuariosMasivo, usuarioController.crearEmpleadosMasivo)
  app.put("/api/usuario", validadorActualizarUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.actualizarUsuario)
  app.delete("/api/usuario/:id", validadorEliminarUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.eliminarUsuario)

  //Rutas Tiendas
  app.get("/api/tiendas", tiendaController.obtenerTiendas)
  app.get("/api/tienda/:id", validadorObtenerPorId, tiendaController.obtenerTienda)
  app.get("/api/tienda/porIdUsuario/:id", validadorObtenerPorId, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.obtenerTiendaPorUsuario)
  app.post("/api/tienda", validadorCrearTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.crearTienda)
  app.post("/api/tienda/activar", validadorActivarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.activarTienda)
  app.post("/api/tienda/recursos", validadorRecursosTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.cargarRecursosTienda)
  app.put("/api/tienda", validadorActualizarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.actualizarTienda)
  app.delete("/api/tienda/:id", validadorEliminarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.eliminarTienda)

  //Rutas Productos
  app.get("/api/productos", productoController.obtenerProductos)
  app.get("/api/productos/paginado", validadorObtenerProductosPaginado, productoController.obtenerProductosPaginado)
  app.get("/api/productos/buscar/paginado", validadorBuscarProductosPaginado, productoController.buscarProductosPaginado)
  app.get("/api/productos/tienda/paginado", validadorProductosPorTiendaPaginado, productoController.obtenerProductosPorTiendaPaginado)
  app.get("/api/producto/:id", validadorObtenerPorId, productoController.obtenerProducto)
  app.post("/api/producto", validadorCrearProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.crearProducto)
  app.post("/api/producto/recursos", validadorRecursosProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.cargarRecursosProducto)
  app.put("/api/producto", validadorActualizarProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.actualizarProducto)
  app.delete("/api/producto/:id", validadorEliminarProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.eliminarProducto)

  //Rutas Categorias
  app.get("/api/categorias", categoriaController.obtenerCategorias)
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

  //Rutas listas
  app.get("/api/lista/ciudades", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ listaController.obtenerListaCiudades)
  app.get("/api/lista/ciudades/departamento/:id", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ listaController.obtenerListaCiudadesPorDepartamento)
  app.get("/api/lista/departamentos", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ listaController.obtenerListaDepartamentos)



}
