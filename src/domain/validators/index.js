const {
  examRepository,
  questionRepository,
  userRepository,
} = require('../../infrastructure/repository');

module.exports = {
  examDomainValidator: require('./examDomainValidator')({
    examRepository,
  }),
  questionDomainValidator: require('./questionDomainValidator')({
    questionRepository,
  }),
  userDomainValidator: require('./userDomainValidator')({
    userRepository,
  }),
};
