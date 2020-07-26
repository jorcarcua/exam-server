const Joi = require('@hapi/joi');
const {joiValidation, addErrors} = require('./utils/validationUtils')

//TODO: Move
const NUM_MAX_EXAMS = 3

 
const ExamBodySchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    user: Joi.string()
})

const ExamParamsSchema = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/) 
})

 

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
        validateBody : async (input) => {
            let messages = [] 

            messages = addErrors(messages, await joiValidation(ExamBodySchema, input))
            
            if(messages.lenght>0){
                const error = new Error('ValidationSyntaxError');
                error.details = messages;
                return {error, data: null}
            }
            
            messages = addErrors(messages, await existTitleValidation(input.title)) 
            
            messages = addErrors(messages, await maxReachedValidation(input.user)) 
            
            if(messages.length>0){ 
                const error = new Error('ValidationConflictError');
                error.details = messages;
                return {error, data: null}
            }
            return {error: null, input}
        },

        validateParams: async (params) => {
            let messages = []

            messages = addErrors(messages, await joiValidation(ExamParamsSchema, params))
            if(messages.length>0){  
                const error = new Error('ValidationSyntaxError');
                error.details = messages;
                return {error, data: null}
            } 

            return {error: null, data: params}
        } 
    })
}


module.exports = examValidator
