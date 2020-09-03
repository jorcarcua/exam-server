const Joi = require('@hapi/joi');
const { validationBody, validationParams } = require('./utils/validationUtils');

const ExamBodySchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  user: Joi.string(),
});

const ExamParamsSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  limit: Joi.number().integer().min(1).max(25),
});

const examValidator = ({ examDomainValidator }) => {
  return {
    validateBody: async (input) => {
      return validationBody(ExamBodySchema, input, examDomainValidator);
    },

    validateParams: async (params) => {
      return validationParams(ExamParamsSchema, params);
    },
  };
};

module.exports = examValidator;
