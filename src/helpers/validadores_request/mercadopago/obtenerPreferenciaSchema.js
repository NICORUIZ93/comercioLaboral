const Joi = require("joi");

const obtenerPreferenciaSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    esMovil: Joi.boolean().required(),
    comprador: Joi.object({
      nombre: Joi.string().empty(""),
      apellido: Joi.string().empty(""),
      correo: Joi.string().empty(""),
      fechaCreacion: Joi.string().empty(""),
      telefono: Joi.object({
        codigoArea: Joi.string().empty(""),
        numero: Joi.number()
      }),
      identificacion: Joi.object({
        tipo: Joi.string().empty(""),
        numero: Joi.string().empty("")
      }),
      direccion: Joi.object({
        direccion: Joi.string().empty(""),
        codigoPostal: Joi.string().empty(""),
        idCiudad: Joi.number(),
        ciudad: Joi.string().empty("")
      })
    }),
    idTienda: Joi.number().integer().required(),
    productos: Joi.array().items(
      Joi.object({
        id: Joi.number().integer(),
        cantidad: Joi.number().integer(),
        tipo: Joi.number().integer(),
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

module.exports.obtenerPreferenciaSchema = obtenerPreferenciaSchema;
