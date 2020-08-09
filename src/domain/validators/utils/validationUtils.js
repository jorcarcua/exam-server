const joiValidation = async (schema, input) => {
  const { error } = await schema.validate(input);
  if (error) {
    return error.details.map((err) => err.message);
  }
  return [];
};

const addErrors = (messages, newMessages) => {
  let result = messages;
  if (newMessages && newMessages.lenghth > 0 && messages.length > 0) {
    result = result.push(', ');
  }

  return [...result, ...newMessages];
};

module.exports = {
  validationBody: async (schema, input, customValidation) => {
    let messages = [];

    messages = addErrors(messages, await joiValidation(schema, input));

    if (messages.lenght > 0) {
      const error = new Error('ValidationSyntaxError');
      error.details = messages;
      return { error, data: null };
    }
    if (customValidation) {
      messages = await customValidation(input, messages);
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
