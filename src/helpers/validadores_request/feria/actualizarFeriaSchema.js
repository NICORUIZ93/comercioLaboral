const Joi = require("joi");

const actualizarFeriaSchema = (req, res, next) => {
  // define base schema rules

  const reglasSchema = {
    idFeria: Joi.number().integer().required(),
    nombre: Joi.string().empty(""),
    fechaInicio: Joi.date(),
    fechaFin: Joi.date(),
    descripcion: Joi.string().empty(""),
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

module.exports.actualizarFeriaSchema = actualizarFeriaSchema;
