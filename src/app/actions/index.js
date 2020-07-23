const {examRepository, questionRepository, userRepository}  = require('../../infrastructure/repository') 
const auth_actions = require('../../infrastructure/authentication/actions')
 
 
  
module.exports = {
    getAllExams:     require('./exam/GetAllExams')({examRepository}),
    createExam:      require('./exam/CreateExam')({examRepository}),
    updateExam:      require('./exam/UpdateExam')({examRepository}),
    deleteExam:      require('./exam/DeleteExam')({examRepository}),
   
    getQuestions:    require('./question/GetQuestions')({questionRepository}),
    createQUestion:  require('./question/CreateQuestion')({questionRepository}),
    updateQuestion:  require('./question/UpdateQuestion')({questionRepository}),
    deleteQUestion:  require('./question/DeleteQuestion')({questionRepository}),

    findUser:        require('./user/FindUser')({userRepository}), 
    login:           require('./user/Login')({auth_actions}),
    register:        require('./user/Register')({auth_actions, userRepository}),
    checkCredentials:        require('./user/CheckCredentials')({userRepository}) 
    
}