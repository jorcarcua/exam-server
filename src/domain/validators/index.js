const {
  examRepository,
  questionRepository,
  userRepository,
} = require('../../infrastructure/repository');

module.exports = {
  examValidator: require('./examValidator')({ examRepository }),
  questionValidator: require('./questionValidator')({ questionRepository }),
  userValidator: require('./userValidator')({ userRepository }),
};
