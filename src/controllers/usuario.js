
const bcrypt = require('bcrypt');
const Usuario = require("../db/models").Usuario;

module.exports = {

  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.status(200).json(usuarios);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async crearUsuario(req, res) {
    try {
      let body = req.body;

      let usuario = {
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        dni: body.dni,
        telefono: body.telefono,
        direccion: body.direccion,
        contrasena: bcrypt.hashSync(body.contrasena, 10),
        username: body.username,
        IdRol: body.idRol
      };

      const nuevoUsuario = await Usuario.create(usuario);

      return res.status(200).json(nuevoUsuario);

    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
};



/*

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/usuario/:id', function(req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});

*/


