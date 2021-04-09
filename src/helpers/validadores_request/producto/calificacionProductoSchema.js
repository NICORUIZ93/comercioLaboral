const Joi = require("joi");

const calificacionProductoSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    calificacion: Joi.number(),
    IdUsuario : Joi.number().integer(),
    IdProducto : Joi.number().integer(),
    comentario : Joi.string().empty("").required(),
  };

  // create schema object with rules
  const schema = Joi.object(reglasSchema).or("IdUsuario", "calificacion" ,"IdProducto","comentario");

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

module.exports.calificacionProductoSchema = calificacionProductoSchema;