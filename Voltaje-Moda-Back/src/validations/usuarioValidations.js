const Joi = require('joi');

const crearUsuarioSchema = Joi.object({
  email: Joi.string().email().required(),
  contraseña: Joi.string().min(6).required(),
  nombre: Joi.string().max(100).required(),
  apellido: Joi.string().max(100).required(),
  telefono: Joi.string().max(20).optional()
});

const actualizarUsuarioSchema = Joi.object({
  nombre: Joi.string().max(100).optional(),
  apellido: Joi.string().max(100).optional(),
  telefono: Joi.string().max(20).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  contraseña: Joi.string().required()
});

module.exports = {
  crearUsuarioSchema,
  actualizarUsuarioSchema,
  loginSchema
};