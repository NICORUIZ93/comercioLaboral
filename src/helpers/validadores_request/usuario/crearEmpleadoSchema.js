const Joi = require("joi");
const Rol = require("../../../constants/roles");

const crearEmpleadoSchema = (req, res, next) => {
  // define base schema rules
  const reglasSchema = {
    nombre: Joi.string().empty(""),
    apellido: Joi.string().empty(""),
    correo: Joi.string().email().empty("").required(),
    dni: Joi.string().empty(""),
    telefono: Joi.number().integer(),
    direccion: Joi.string().min(6).empty(""),
    IdFoto: Joi.number().integer(),
    imagen: Joi.string().empty(""),
    codigo: Joi.number().integer(),
    billetera : Joi.boolean(),
    pedidos : Joi.boolean(),
    productos : Joi.boolean() 
  };


  // conditional schema rule - only admins can update role
  if (req.body.IdRol) {
    if (req.body.IdRol === Rol.VendedorID || req.body.IdRol === Rol.EmpleadoID || req.body.IdRol === Rol.CompradorID || req.body.IdRol === undefined || req.body.IdRol === null ) {
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