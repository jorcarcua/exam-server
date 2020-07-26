const {examRepository, questionRepository, userRepository}  = require('../../infrastructure/repository') 
const {examValidator, questionValidator, userValidator} = require('../../domain/validators')
const auth_actions = require('../../infrastructure/authentication/actions')
 
  
module.exports = {
    getExamsByUser:  require('./exam/GetExamsByUser')({examRepository}),
    findExam:        require('./exam/FindExam')({examRepository,  examValidator}),
    createExam:      require('./exam/CreateExam')({examRepository, examValidator}),
    updateExam:      require('./exam/UpdateExam')({examRepository, examValidator}),
    deleteExam:      require('./exam/DeleteExam')({examRepository, examValidator}),
   
    getQuestions:    require('./question/GetQuestions')({questionRepository}),
    createQUestion:  require('./question/CreateQuestion')({questionRepository}),
    updateQuestion:  require('./question/UpdateQuestion')({questionRepository}),
    deleteQUestion:  require('./question/DeleteQuestion')({questionRepository}),

    findUser:        require('./user/FindUser')({userRepository}), 
    login:           require('./user/Login')({auth_actions}),
    register:        require('./user/Register')({auth_actions, userRepository}),
    checkCredentials: require('./user/CheckCredentials')({userRepository}) 
    
}