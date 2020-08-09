const Joi = require('@hapi/joi');
const {
  validationBody,
  validationParams,
  addErrors,
} = require('./utils/validationUtils');

const UserBodySchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string().min(3).max(10).required(),
});

const UserParamsSchema = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});

const userValidator = ({ userRepository }) => {
  const existUsernameValidation = async (username) => {
    const text = 'Username already exists';
    let result = [];
    if (await userRepository.existsUsername(username)) {
      result = [text];
      return result;
    }
    return result;
  };

  const customValidation = async (input, messages) => {
    const newMessages = addErrors(
      messages,
      await existUsernameValidation(input.username)
    );

    return newMessages;
  };

  return {
    validateBody: async (input) => {
      return validationBody(UserBodySchema, input, customValidation);
    },

    validateParams: async (params) => {
      return validationParams(UserParamsSchema, params);
    },
  };
};

module.exports = userValidator;
