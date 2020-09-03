const Joi = require('@hapi/joi');
const { validationBody, validationParams } = require('./utils/validationUtils');

const UserBodySchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string().min(3).max(10).required(),
});

const UserParamsSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const userValidator = ({ userDomainValidator }) => {
  return {
    validateBody: async (input) => {
      return validationBody(UserBodySchema, input, userDomainValidator);
    },

    validateParams: async (params) => {
      return validationParams(UserParamsSchema, params);
    },
  };
};

module.exports = userValidator;
