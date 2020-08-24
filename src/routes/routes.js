const usuarioController = require("../controllers/usuario");
const productoController = require("../controllers/producto");
const tiendaController = require("../controllers/tienda")
const cargarArchivosController = require("../controllers/cargarArchivos")
const autorizacion = require("../services/autorizacion");
const Rol = require('../constants/roles');
const validadorUsuario = require("../helpers/validadores_request/usuario/crearUsuarioSchema");


module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Api MultiStore v1",
    })
  })
  
  //Ruta cargue de archivos
  app.post("/api/archivos", cargarArchivosController.cargarArchivos)

  //Login
  app.post("/api/login", autorizacion.login)

  //Rutas Usuarios
  app.get("/api/usuarios", /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.obtenerUsuarios)
  app.get("/api/usuario/:id", /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.obtenerUsuario)
  app.post("/api/usuario", /*validadorUsuario.crearUsuarioSchema,*/ usuarioController.crearUsuario)
  app.put("/api/usuario", /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.actualizarUsuario)
  app.delete("/api/usuario/:id", /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.eliminarUsuario)

  //Rutas Tiendas
  app.get("/api/tiendas", tiendaController.obtenerTiendas)
  app.get("/api/tienda/:id", tiendaController.obtenerTienda)
  app.post("/api/tienda", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.crearTienda)
  app.put("/api/tienda", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.actualizarTienda)
  app.delete("/api/tienda/:id", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.eliminarTienda)

  //Rutas Productos
  app.get("/api/productos", productoController.obtenerProductos)
  app.get("/api/producto/:id", productoController.obtenerProducto)
  app.post("/api/producto", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.crearProducto)
  app.put("/api/producto", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.actualizarProducto)
  app.delete("/api/producto/:id", /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.eliminarProducto)

}