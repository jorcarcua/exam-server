

module.exports = ({examRepository, examValidator}) => async (id) => {
    const {error, data} = await examValidator.validateParams({id: id})   
    if (error) {  
        throw error
    }
    return await examRepository.deleteExam(id)
}