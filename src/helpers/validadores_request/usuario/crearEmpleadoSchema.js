const Joi = require("joi");
const Rol = require("../../../constants/roles");

const crearEmpleadoSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    nombre: Joi.string().empty(""),
    apellido: Joi.string().empty(""),
    correo: Joi.string().email().empty("").required(),
    dni: Joi.string().empty(""),
    contrasena : Joi.string().empty("").required(),
    telefono: Joi.number().integer(),
    direccion: Joi.string().min(6).empty(""),
    IdRol: 2,
    idTienda : Joi.number().integer().required() 
  };


  // conditional schema rule - only admins can update role
  if (req.body.IdRol) {
    if (req.body.IdRol === Rol.VendedorID) {
      reglasSchema.contrasena = Joi.string().min(6).empty("").required();
      /*
      reglasSchema.confirmarContrasena = Joi.string()
        .min(6)
        .valid(Joi.ref("contrasena"))
        .empty("");
      */
    }
  }

  // create schema object with rules
  const schema = Joi.object(reglasSchema)
    // make confirmPassword required IF password is present
    //.with("contrasena", "confirmarContrasena");

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

module.exports.crearEmpleadoSchema = crearEmpleadoSchema;