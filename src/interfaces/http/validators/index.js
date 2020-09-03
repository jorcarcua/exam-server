const {
  examDomainValidator,
  questionDomainValidator,
  userDomainValidator,
} = require('../../../domain/validators');

module.exports = {
  examValidator: require('./examValidator')({ examDomainValidator }),
  questionValidator: require('./questionValidator')({
    questionDomainValidator,
  }),
  userValidator: require('./userValidator')({ userDomainValidator }),
};
