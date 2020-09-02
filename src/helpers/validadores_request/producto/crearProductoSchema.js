const Joi = require("joi");

const crearProductoSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    nombre: Joi.string().empty("").required(),
    descripcion: Joi.string().empty("").required(),
    IdCategoria: Joi.number().integer().required(),
    IdTienda: Joi.number().integer().required(),
    valor: Joi.number().integer().required(),
    cantidad: Joi.number().integer().required(),
    maxFotos: Joi.number(),
    oferta:Joi.boolean(),
    estado:Joi.boolean(),
    imagenes: Joi.array().items(
      Joi.object({
        url: Joi.string().empty(""),
        prioridad: Joi.number().integer()
      })
    )
  };

  if (req.body.oferta) {
    if(req.body.oferta === true){
      reglasSchema.valorOferta = Joi.number().required();
    }
  }


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

module.exports.crearProductoSchema = crearProductoSchema;
