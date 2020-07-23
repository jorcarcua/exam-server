const examModel = require('../database/models').examModel
const questionModel = require('../database/models').questionModel
const userModel = require('../database/models').userModel
 
module.exports = {
    examRepository: require('./ExamRepository')({examModel}),
    questionRepository: require('./QuestionRepository')({questionModel}),
    userRepository: require('./UserRepository')({userModel})
}