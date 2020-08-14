const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const { Op } = require("sequelize");

 
const _jwtSecret = "0.rfyj3n9nzh";
const jwtExpirySeconds = 60 * 15;


module.exports = {
    
  async VerificarToken(req, res, next) {

    if (typeof req.headers.authorization !== "undefined") {

      let token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, _jwtSecret, { algorithm: "HS256" }, (err, user) => {
        if (err) {
          return res.status(500).json({ error: "Not Authorized" });
        }
        return next();
      });
    } 
    else {
      return res.status(500).json({ error: "Not Authorized" });
    }
  },

  async Login(req, res){

    const { username, correo, contrasena } = req.body;

    try {
    
      if ((!username && !correo) || !contrasena) {
          return res.status(401).json({error: "Faltan campos obligatorios"});
      }


      const usuario = await Usuario.findOne({ where: {
          [Op.or]: [
            { username: username || "" },
            { correo: correo || "" }
          ]
        } });

        console.log(usuario)

        const loginResult = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!loginResult) {
          return res.status(401).json({
              message: "Authentication failed"
          });
      }

      const token = jwt.sign({ username }, _jwtSecret, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      });

      console.log("token:", token);

      return res.status(200).json({ token: token, expiresIn: jwtExpirySeconds });

    } 
    catch (error) {
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
  }

}
