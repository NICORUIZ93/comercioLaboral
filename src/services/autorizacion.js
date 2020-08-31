const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const Rol = require("../db/models").Rol;
const jwtExpress = require("express-jwt");
const _Rol = require("../constants/roles");

const _jwtSecret = process.env.JWT_SECRET;
const jwtExpirySeconds = 60 * 15;

module.exports = {
  autorizar(roles = []) {
    if (typeof roles === "string") {
      roles = [roles];
    }

    console.log("env variable" + process.env.JWT_SECRET);
    console.log("env variable secret" + _jwtSecret);

    return [
      jwtExpress({ secret: _jwtSecret, algorithms: ["HS256"] }),

      (req, res, next) => {
        if (roles.length && !roles.includes(req.user.rol)) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        next();
      },
    ];
  },

  async login(req, res) {
    const { correo, contrasena } = req.body;

    try {
      if (!correo) {
        return res.status(401).json({ error: "Faltan campos obligatorios" });
      }

      const usuario = await Usuario.findOne({
        where: {
          correo: correo,
        },
        include: [Rol],
      });

      if (!usuario) throw Error("Usuario no existe");

      const rol = usuario.Rol.nombre;
      const token = generarToken(correo, rol);

      if (rol === _Rol.Comprador) {
        return res
          .status(200)
          .json({ token: token, expiresIn: jwtExpirySeconds });
      }

      const loginResult = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!loginResult) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }

      console.log("token:", token);

      return res
        .status(200)
        .json({ token: token, expiresIn: jwtExpirySeconds });
    } catch (error) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
  },
};

const generarToken = (correo, rol) => {
  return jwt.sign({ correo, rol }, _jwtSecret, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
};
