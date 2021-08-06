const Joi = require('joi');

const validate = (schema) => async (input) => await schema.validateAsync(input);

const addBookSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
});

const validateAddBook = validate(addBookSchema);

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required();
const validateId = validate(idSchema);

const commentSchema = Joi.string().min(1).max(400).required();
const validateComment = validate(commentSchema);

module.exports = {
  validateAddBook,
  validateId,
  validateComment,
};
