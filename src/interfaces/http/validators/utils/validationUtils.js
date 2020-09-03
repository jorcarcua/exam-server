const { addErrors } = require('../../../../utils');

const joiValidation = async (schema, input) => {
  const { error } = await schema.validate(input);
  if (error) {
    return error.details.map((err) => err.message);
  }
  return [];
};

module.exports = {
  validationBody: async (schema, input, domainValidation) => {
    let messages = [];

    messages = addErrors(messages, await joiValidation(schema, input));

    if (messages.lenght > 0) {
      const error = new Error('ValidationSyntaxError');
      error.details = messages;
      return { error, data: null };
    }
    if (domainValidation) {
      messages = await domainValidation.validate(input);
    }

    if (messages.length > 0) {
      const error = new Error('ValidationConflictError');
      error.details = messages;
      return { error, data: null };
    }
    return { error: null, input };
  },
  validationParams: async (schema, params) => {
    let messages = [];

    messages = addErrors(messages, await joiValidation(schema, params));
    if (messages.length > 0) {
      const error = new Error('ValidationSyntaxError');
      error.details = messages;
      return { error, data: null };
    }

    return { error: null, data: params };
  },
  addErrors,
};
