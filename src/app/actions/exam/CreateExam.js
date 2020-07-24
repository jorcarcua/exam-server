const BaseError = require("../../../infrastructure/http/errors/BaseError")


module.exports = ({examRepository, examValidator}) => async (exam) => { 
    
    const error = await examValidator.validate(exam)
    if (error) { 
        throw (new BaseError(error.status, error.message, true))
    } else {  
        return await examRepository.createExam(exam)
    }

}