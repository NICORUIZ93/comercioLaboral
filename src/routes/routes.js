const usuarioController = require("../controllers/usuario")
const auth = require("../services/auth");

module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Api MultiStore v1",
    })
  })

  //Rutas usuarios
  app.post("/api/login", auth.Login)
  app.get("/api/usuarios", auth.VerificarToken, usuarioController.obtenerUsuarios)
  app.post("/api/usuario",  usuarioController.crearUsuario)
  app.put("/api/usuario",  auth.VerificarToken, usuarioController.actualizarUsuario)
  app.delete("/api/usuario/:id",  auth.VerificarToken, usuarioController.eliminarUsuario)

}