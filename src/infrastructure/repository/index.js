const { ExamModel } = require('../database/models');
const { QuestionModel } = require('../database/models');
const { UserModel } = require('../database/models');

module.exports = {
  examRepository: require('./examRepository')({ ExamModel }),
  questionRepository: require('./questionRepository')({ QuestionModel }),
  userRepository: require('./userRepository')({ UserModel }),
};
