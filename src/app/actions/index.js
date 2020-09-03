const {
  examRepository,
  questionRepository,
  userRepository,
} = require('../../infrastructure/repository');

const {
  examValidator,
  questionValidator,
  userValidator,
} = require('../../interfaces/http/validators');

module.exports = ({ config }) => ({
  getExamsByUser: require('./exam/getExamsByUser')({
    examRepository,
    examValidator,
  }),
  findExam: require('./exam/findExam')({ examRepository, examValidator }),
  createExam: require('./exam/createExam')({ examRepository, examValidator }),
  updateExam: require('./exam/updateExam')({ examRepository, examValidator }),
  deleteExam: require('./exam/deleteExam')({ examRepository, examValidator }),

  findQuestion: require('./question/findQuestion')({
    questionRepository,
    questionValidator,
  }),
  createQuestion: require('./question/createQuestion')({
    questionRepository,
    questionValidator,
  }),
  updateQuestion: require('./question/updateQuestion')({
    questionRepository,
    questionValidator,
  }),
  deleteQuestion: require('./question/deleteQuestion')({
    questionRepository,
    questionValidator,
  }),
  getQuestionsExam: require('./question/getQuestionsExam')({
    questionRepository,
    questionValidator,
  }),
  randomQuestion: require('./question/randomQuestion')({
    questionRepository,
    questionValidator,
  }),

  findUser: require('./user/findUser')({ userRepository }),
  register: require('./user/register')({
    userRepository,
    userValidator,
    config,
  }),
  checkCredentials: require('./user/checkCredentials')({ userRepository }),
});
