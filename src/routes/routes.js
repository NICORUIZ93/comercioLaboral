const usuarioController = require("../controllers/usuario")
const cargarArchivosController = require("../controllers/cargarArchivos")
const autorizacion = require("../services/autorizacion");
const Rol = require('../helpers/roles');


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

  //Rutas usuarios
  app.get("/api/usuarios", autorizacion.autorizar(Rol.Administrador), usuarioController.obtenerUsuarios)
  app.post("/api/usuario", usuarioController.crearUsuario)
  app.put("/api/usuario", autorizacion.autorizar(Rol.Administrador), usuarioController.actualizarUsuario)
  app.delete("/api/usuario/:id",  autorizacion.autorizar(Rol.Administrador), usuarioController.eliminarUsuario)

}