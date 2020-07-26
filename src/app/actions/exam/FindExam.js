

module.exports = ({examRepository, examValidator}) => async (id) => { 
    try{
        const {error, data} = await examValidator.validateParams({id: id})   
        if (error) {   
           throw error
        } else {  
             return examRepository.findExam(id)
        }
    }catch(error){
        throw error
    }
}