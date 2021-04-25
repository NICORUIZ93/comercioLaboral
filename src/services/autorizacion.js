const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const Rol = require("../db/models").Rol;
const jwtExpress = require("express-jwt");
const _Rol = require("../constants/roles");
const { usuarioService } = require( "../services/usuario");

const _jwtSecret = process.env.JWT_SECRET;
const jwtExpirySeconds = 60 * 15;

module.exports = {
  
  autorizar(roles = []) {
    if (typeof roles === "string") {
      roles = [roles];
    }

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
    const { correo, contrasena, nombre } = req.body;

    const contrasenaSinEncriptar = contrasena;

    try {
      if (!correo) {
        return res.status(401).json({ error: "Faltan campos obligatorios" });
      }

      let usuario = await usuarioService.obtenerUsuarioPorParametros([{ correo: correo }]);
      
      //if (!usuario) throw Error("Usuario no existe");
      if (!usuario) {
        usuario = await usuarioService.crearUsuario({ correo, nombre, IdRol: _Rol.CompradorID });
        usuario = await usuarioService.obtenerUsuarioPorParametros([{ correo: correo }]);
      }

      const { contrasena, ...usuarioSinContrasena } = usuario;

      const rol = usuario.Rol.nombre;
      const token = generarToken(correo, rol);

      if (rol === _Rol.Comprador) {
        return res
          .status(200)
          .json({ token: token, expiresIn: jwtExpirySeconds, usuario: usuarioSinContrasena });
      }

      const loginResult = await bcrypt.compare(contrasenaSinEncriptar, contrasena);

      if (!loginResult) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }

      return res
        .status(200)
        .json({ token: token, expiresIn: jwtExpirySeconds, usuario: usuarioSinContrasena });

    } catch (error) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
  },
  async cambio_pass(req,res){
      let { nueva , confirmacion } = req.body
      
  }
};

const generarToken = (correo, rol) => {
  return jwt.sign({ correo, rol }, _jwtSecret, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
};
