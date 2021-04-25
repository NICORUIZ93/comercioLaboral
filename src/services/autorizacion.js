const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;
const codigosRestablecimiento = require('../db/models').codigosRestablecimiento;
const Rol = require("../db/models").Rol;
const jwtExpress = require("express-jwt");
const _Rol = require("../constants/roles");
const { usuarioService } = require("../services/usuario");
const nodemailer = require("nodemailer");
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
  async cambio_pass(req, res) {
    let { correo, antigua, nueva, confirmacion } = req.body
    let contrasenaSinEncriptar = antigua

    if (!nueva == confirmacion) {
      return res.status(401).json({
        message: "Contraseñas no coinciden",
      });
    }

    let usuario = await Usuario.findAll({
      where: {
        'correo': correo
      }
    })

    const loginResult = await bcrypt.compare(contrasenaSinEncriptar, usuario.contrasena);

    if (!loginResult) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }

    nueva = bcrypt.hashSync(nueva, 10);

    let update = await Usuario.update({ constrasena: nueva }, { where: { 'correo': correo } })

    return res
      .status(200)
      .json(update)



  },
  async correo_cambio(req, res) {
    try {
      let u = "no.reply.comerzio@gmail.com";
      let p = "Imdsas2021.*";
      let { correo } = req.body
      let numero = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      let new_code = await codigosRestablecimiento.create({ codigo: numero })
      console.log(new_code)
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: u,
          pass: p // naturally, replace both with your real credentials or an application-specific password
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Comerzio" <no.reply.comerzio@gmail.com>', // sender address
        to: correo, // list of receivers
        subject: "Restablecimiento contraseña  - Comerzio", // Subject line
        html: `
               <h1> Comerzio</h1> <br></br>
               <h2> Codigo comerzio para restablecer tu contraseña </h2> <br></br>
               <h2> ${numero} </h2>
        `, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      setTimeout(async function () {
        await codigosRestablecimiento.destroy({
          where: {
            'codigo': numero
          }
        });
      }, 1200000)
      res.status(200).json("correo enviado")
    } catch (error) {
      console.log(`${error}`);
      res.json(error)
    }
  },
  async verificar_codigo(req,res){
      try {
        let codigo = req.params.codigo;
        let verificacion = await codigosRestablecimiento.findAll({
          where: {
            'codigo': parseInt(codigo)
          }
        });
        if ((JSON.parse(JSON.stringify(verificacion)))[0] != undefined) {
          res.status(200).json("Codigo valido")
        }else{
          res.status(500).json("Codigo no valido") 
        } 
      } catch (error) {
         res.status(500).json("Codigo no valido" + error)
      }


  }
};

const generarToken = (correo, rol) => {
  return jwt.sign({ correo, rol }, _jwtSecret, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
};
