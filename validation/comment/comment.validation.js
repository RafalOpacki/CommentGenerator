const Joi = require('@hapi/joi');

const commentSchemaValidation = Joi.object({
  text: Joi.string().required(),
});

module.exports = commentSchemaValidation;
