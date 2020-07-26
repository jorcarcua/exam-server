


module.exports = ({examRepository, examValidator}) => async (id, exam) => {
        const paramValidationResult = await examValidator.validateParams({id: id})  
      
        if(paramValidationResult.error) { throw paramValidationResult.error }
       
        const bodyValidationResult  = await examValidator.validateBody(exam) 
     
        if (bodyValidationResult.error) {  throw bodyValidationResult.error }   
            
        return  await examRepository.updateExam(id, exam)   
        
}