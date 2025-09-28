const Joi = require('joi');

const crearProductoSchema = Joi.object({
  sku: Joi.string().max(100).required(),
  nombre: Joi.string().max(255).required(),
  descripcion: Joi.string().allow('').optional(),
  precio: Joi.number().precision(2).min(0).required(),
  categoria_id: Joi.number().integer().min(1).optional(),
  etiqueta: Joi.string().valid('nuevo', 'oferta', 'popular').optional(),
  meta_titulo: Joi.string().max(255).optional(),
  meta_descripcion: Joi.string().optional()
});

const actualizarProductoSchema = Joi.object({
  sku: Joi.string().max(100).optional(),
  nombre: Joi.string().max(255).optional(),
  descripcion: Joi.string().allow('').optional(),
  precio: Joi.number().precision(2).min(0).optional(),
  categoria_id: Joi.number().integer().min(1).optional(),
  etiqueta: Joi.string().valid('nuevo', 'oferta', 'popular').optional(),
  activo: Joi.boolean().optional(),
  meta_titulo: Joi.string().max(255).optional(),
  meta_descripcion: Joi.string().optional()
});

module.exports = {
  crearProductoSchema,
  actualizarProductoSchema
};