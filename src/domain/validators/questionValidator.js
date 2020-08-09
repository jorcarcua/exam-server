const Joi = require('@hapi/joi');
const { validationBody, validationParams } = require('./utils/validationUtils');

const QuestionBodySchema = Joi.object({
  text: Joi.string().min(3).max(60).required(),
  answers: Joi.array().items(
    Joi.object({
      text: Joi.string().min(3).max(60).required(),
      correct: Joi.boolean().required(),
    })
  ),
  exam: Joi.string(),
});

const QuestionParamsSchema = Joi.object({
  exam: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

// eslint-disable-next-line no-unused-vars
const questionValidator = ({ questionRepository }) => {
  return {
    validateBody: async (input) => {
      return validationBody(QuestionBodySchema, input, null);
    },

    validateParams: async (params) => {
      return validationParams(QuestionParamsSchema, params);
    },
  };
};

module.exports = questionValidator;
