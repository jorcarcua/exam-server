const { addErrors } = require('../../utils');

const questionDomainValidator = ({ questionRepository }) => {
  return {
    validate: async (input) => {
      return [];
    },
  };
};
module.exports = questionDomainValidator;
