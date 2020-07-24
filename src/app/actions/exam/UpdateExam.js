const BaseError = require("../../../infrastructure/http/errors/BaseError")


module.exports = ({examRepository, examValidator}) => async (id, exam) => {
     
        const { error, value } = await examValidator.validate(exam)

        if (error) {
            const messages = error.details.map(error => error.message)
            throw (new BaseError(400, messages.toString(), true))
        } else {  
            const titleExists = await examRepository.existsExamWithTitle(exam.title)
            
            if(titleExists){
                throw (new BaseError(409, `Conflict: There is already and exam with title ${exam.title}`, true))
            }

            const newExam = await examRepository.updateExam(id, exam) 

            if(!newExam){ throw(new BaseError(404, 'Exam not found', true)) }
            
            return newExam
        }
}