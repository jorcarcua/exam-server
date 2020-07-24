const BaseError = require("../../../infrastructure/http/errors/BaseError")


module.exports = ({examRepository, examValidator}) => async (id, exam) => {
      
        const error = await examValidator.validate(exam) 
        if (error) { 
            throw (new BaseError(error.status, error.message, true))
        } else {  

            const newExam = await examRepository.updateExam(id, exam) 

            if(!newExam){ throw(new BaseError(404, 'Exam not found', true)) }
            
            return newExam
        }
}