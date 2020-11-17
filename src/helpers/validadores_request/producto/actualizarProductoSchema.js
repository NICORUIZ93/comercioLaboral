const Joi = require("joi");

const actualizarProductoSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    id: Joi.number().integer().required(),
    nombre: Joi.string().empty("").required(),
    descripcion: Joi.string().empty("").required(),
    IdCategoria: Joi.number().integer().required(),
    valor: Joi.number().integer().required(),
    cantidad: Joi.number().integer().required(),
    maxFotos: Joi.number(),
    oferta: Joi.boolean(),
    porMayor:Joi.boolean(),
    valorPorMayor: Joi.number().integer().required(),
    tags: Joi.string().empty("").required(), 
    caracteristicas: Joi.string().empty("").required(),
    estado:Joi.boolean()
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

module.exports.actualizarProductoSchema = actualizarProductoSchema;
