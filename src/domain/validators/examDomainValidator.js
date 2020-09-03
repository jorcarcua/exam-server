const { addErrors } = require('../../utils');

const NUM_MAX_EXAMS = 3;

const examDomainValidator = ({ examRepository }) => {
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
    const num = (await examRepository.getExamsByUser(userId)).length;

    if ((await examRepository.getExamsByUser(userId)).length >= NUM_MAX_EXAMS) {
      result = [text];
      return result;
    }
    return result;
  };

  return {
    validate: async (input) => {
      let newMessages = addErrors([], await existTitleValidation(input.title));
      newMessages = addErrors(
        newMessages,
        await maxReachedValidation(input.user)
      );
      return newMessages;
    },
  };
};

module.exports = examDomainValidator;
