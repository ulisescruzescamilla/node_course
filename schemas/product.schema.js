const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(2).max(255);
const price = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
  name : name.required(),
  price: price.required()
});

const updateProductSchema = Joi.object({
  name,
  price
});

const getProductSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}
