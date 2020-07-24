const {examRepository} = require ('../../infrastructure/repository')
 

module.exports = {
    examValidator:      require('./ExamValidator')({examRepository}),
    questionValidator:  require('./QuestionValidator'),
    userValidator:      require('./UserValidator')
}