const Joi = require("joi");

const crearTiendaSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    nombre: Joi.string().empty("").required(),
    direccion: Joi.string().empty("").required(),
    descripcion: Joi.string().empty("").required(),
    banco: Joi.string().empty(""),
    numeroCuenta: Joi.string().empty(""),
    tipoCuenta: Joi.string().empty(""),
    maxFotos: Joi.number().integer(),
    IdUsuario: Joi.number().integer().required(),
    estado:Joi.boolean(),
    imagenes: Joi.array().items(
      Joi.object({
        url: Joi.string().empty(""),
        prioridad: Joi.number().integer()
      })
    )
  };


  // create schema object with rules
  const schema = Joi.object(reglasSchema);


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

module.exports.crearTiendaSchema = crearTiendaSchema;
