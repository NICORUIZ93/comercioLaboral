const Joi = require("joi");

const crearFeriaSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    nombre: Joi.string().empty("").required(),
    fechaInicio: Joi.date().required(),
    fechaFin: Joi.date().required(),
    descripcion: Joi.string().empty("").required(),
    activa: Joi.boolean()
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

module.exports.crearFeriaSchema = crearFeriaSchema;
