const Joi = require('@hapi/joi');
const {
  validationBody,
  validationParams,
  addErrors,
} = require('./utils/validationUtils');

const NUM_MAX_EXAMS = 3;

const ExamBodySchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  user: Joi.string(),
});

const ExamParamsSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  limit: Joi.number().integer().min(1).max(25),
});

const examValidator = ({ examRepository }) => {
  const existTitleValidation = async (title) => {
    const text = 'Title already exists';
    let result = [];
    if (await examRepository.existsExamWithTitle(title)) {
      result = [text];
      return result;
    }

    return result;
  };

  const maxReachedValidation = async (userId) => {
    const text = 'Num max exams for user reached';
    let result = [];
    if ((await examRepository.getExamsByUser(userId).lenght) >= NUM_MAX_EXAMS) {
      result = [text];
      return result;
    }
    return result;
  };

  const customValidation = async (input, messages) => {
    let newMessages = addErrors(
      messages,
      await existTitleValidation(input.title)
    );

    newMessages = addErrors(messages, await maxReachedValidation(input.user));

    return newMessages;
  };

  return {
    validateBody: async (input) => {
      return validationBody(ExamBodySchema, input, customValidation);
    },

    validateParams: async (params) => {
      return validationParams(ExamParamsSchema, params);
    },
  };
};

module.exports = examValidator;
