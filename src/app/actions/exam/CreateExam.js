const BaseError = require("../../../infrastructure/http/errors/BaseError")


module.exports = ({examRepository, examValidator}) => async (exam) => { 
    
    const { error, value } = await examValidator.validate(exam)

    if (error) {
        const messages = error.details.map(error => error.message)
        throw (new BaseError(400, messages.toString(), true))
    } else {
        return await examRepository.createExam(exam)
    }

}