const Rol = require('../constants/roles');

//Controladores
const usuarioController = require("../controllers/usuario");
const productoController = require("../controllers/producto");
const tiendaController = require("../controllers/tienda")
const cargarArchivosController = require("../controllers/cargarArchivos")
const autorizacion = require("../services/autorizacion");
const categoriaController = require("../controllers/categoria")

//Validadores
const { validadorCrearUsuario, validadorActualizarUsuario, validadorEliminarUsuario, validadorObtenerUsuario } = require("../helpers/validadores_request/usuario");
const { validadorCrearProducto, validadorActualizarProducto, validadorEliminarProducto, validadorObtenerProducto } = require("../helpers/validadores_request/producto");
const { validadorCrearTienda, validadorActualizarTienda, validadorEliminarTienda, validadorObtenerTienda } = require("../helpers/validadores_request/tienda");
const { validadorCrearCategoria, validadorActualizarCategoria, validadorEliminarCategoria, validadorObtenerCategoria } = require("../helpers/validadores_request/categoria");



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
  app.get("/api/usuario/:id", validadorObtenerUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.obtenerUsuario)
  app.post("/api/usuario", validadorCrearUsuario, usuarioController.crearUsuario)
  app.put("/api/usuario", validadorActualizarUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.actualizarUsuario)
  app.delete("/api/usuario/:id", validadorEliminarUsuario, /*autorizacion.autorizar(Rol.Administrador),*/ usuarioController.eliminarUsuario)

  //Rutas Tiendas
  app.get("/api/tiendas", tiendaController.obtenerTiendas)
  app.get("/api/tienda/:id", validadorObtenerTienda, tiendaController.obtenerTienda)
  app.post("/api/tienda", validadorCrearTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.crearTienda)
  app.put("/api/tienda", validadorActualizarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.actualizarTienda)
  app.delete("/api/tienda/:id", validadorEliminarTienda, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ tiendaController.eliminarTienda)

  //Rutas Productos
  app.get("/api/productos", productoController.obtenerProductos)
  app.get("/api/producto/:id", validadorObtenerProducto, productoController.obtenerProducto)
  app.post("/api/producto", validadorCrearProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.crearProducto)
  app.put("/api/producto", validadorActualizarProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.actualizarProducto)
  app.delete("/api/producto/:id", validadorEliminarProducto, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ productoController.eliminarProducto)

  //Rutas Categorias
  app.get("/api/categorias", categoriaController.obtenerCategorias)
  app.get("/api/categoria/:id", validadorObtenerCategoria, categoriaController.obtenerCategoria)
  app.post("/api/categoria", validadorCrearCategoria, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ categoriaController.crearCategoria)
  app.put("/api/categoria", validadorActualizarCategoria, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ categoriaController.actualizarCategoria)
  app.delete("/api/categoria/:id", validadorEliminarCategoria, /*autorizacion.autorizar([Rol.Vendedor,Rol.Administrador]),*/ categoriaController.eliminarCategoria)

}