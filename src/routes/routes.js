const usuarioController = require("../controllers/usuario")
const auth = require("../services/auth");

module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Api MultiStore v1",
    })
  })

  app.post("/api/login", auth.Login)
  app.get("/api/usuarios", auth.VerificarToken, usuarioController.obtenerUsuarios)
  app.post("/api/usuario",  usuarioController.crearUsuario)

}