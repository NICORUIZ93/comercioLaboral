const Joi = require("joi");

const eliminarRecursoProductoSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    idProducto: Joi.number().integer().required(),
    idRecurso: Joi.number().integer().required()
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
  const { error, value } = schema.validate(req.query, opciones);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
};

module.exports.eliminarRecursoProductoSchema = eliminarRecursoProductoSchema;
