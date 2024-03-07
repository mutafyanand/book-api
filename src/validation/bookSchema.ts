import Joi from 'joi';

const createBookSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
    'any.required': 'Title is required.'
  }),
  author: Joi.string().required().messages({
    'string.empty': 'Author is required.',
    'any.required': 'Author is required.'
  }),
  isbn: Joi.string().required().messages({
    'string.empty': 'ISBN is required.',
    'any.required': 'ISBN is required.'
  })
});

const updateBookSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  isbn: Joi.string().optional(),
}).or('title', 'author', 'ispn');

export { createBookSchema, updateBookSchema };
