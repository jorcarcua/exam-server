const { addErrors } = require('../../utils');

const userDomainValidator = ({ userRepository }) => {
  const existUsernameValidation = async (username) => {
    const text = 'Username already exists';
    let result = [];
    if (await userRepository.existsUsername(username)) {
      result = [text];
      return result;
    }
    return result;
  };

  return {
    validate: async (input) => {
      const newMessages = addErrors(
        [],
        await existUsernameValidation(input.username)
      );
      return newMessages;
    },
  };
};

module.exports = userDomainValidator;
