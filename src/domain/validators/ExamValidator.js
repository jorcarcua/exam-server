const Joi = require('@hapi/joi');
const {joiValidation, addErrors} = require('./utils/validationUtils')

const ExamSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    user: Joi.string()
})

//TODO: Move
const NUM_MAX_EXAMS = 3


const examValidator = ({examRepository}) => {
    const existTitleValidation = async (title) => {
        const text = 'Title already exists'
        let result = []
        if(await examRepository.existsExamWithTitle(title)){
            return result = [text]
        }
      
        return result
    }
    
    const maxReachedValidation = async (userId) => {
        const text = 'Num max exams for user reached'
        let result = []
        if(await examRepository.getExamsByUser(userId).lenght >= NUM_MAX_EXAMS){
            return result = [text]
        } 
        return result
    }
    
    return ({
        validate : async (input) => {
            let messages = []

            messages = addErrors(messages, await joiValidation(ExamSchema, input))
            
            if(messages.lenght>0){
                return {status:400, message: messages} //TODO: create object type
            }
            
            messages = addErrors(messages, await existTitleValidation(input.title)) 
            
            messages = addErrors(messages, await maxReachedValidation(input.user)) 
            
            if(messages.length>0){ 
                return {status:409, message: messages}
            }
          
             
        }
    })
}


module.exports = examValidator
