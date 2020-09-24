const Joi = require("joi");

const actualizarTiendaSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    id: Joi.number().integer().required(),
    descripcion: Joi.string().empty("").required(),
    banco: Joi.string().empty(""),
    telefono:Joi.string().empty(""),
    numeroCuenta: Joi.string().empty(""),
    tipoCuenta: Joi.string().empty(""),
    tipoTienda: Joi.string().empty(""),
    maxFotos: Joi.number().integer(),
    estado:Joi.boolean(),
    idCiudad: Joi.number().integer(),
    idDepartamento: Joi.number().integer(),
    porcentajeComision: Joi.number(),
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

module.exports.actualizarTiendaSchema = actualizarTiendaSchema;
