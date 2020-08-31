const Joi = require("joi");
const Rol = require("../../../constants/roles");

const crearUsuariosMasivoSchema = (req, res, next) => {
  // define base schema rules

  const reglasSchema = {
    usuarios: Joi.array().items(
      Joi.object({
        nombre: Joi.string().empty(""),
        apellido: Joi.string().empty(""),
        correo: Joi.string().email().empty("").required(),
        dni: Joi.string().empty(""),
        telefono: Joi.number().integer(),
        direccion: Joi.string().min(6).empty(""),
        IdRol: Joi.number().integer().required(),
        IdFoto: Joi.number().integer(),
      })
    ).min(1).max(4).required(),
  };

  // create schema object with rules
  const schema = Joi.object(reglasSchema)

  // schema options
  const opciones = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, opciones);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
};

module.exports.crearUsuariosMasivoSchema = crearUsuariosMasivoSchema;
