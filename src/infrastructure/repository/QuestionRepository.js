

module.exports = ({questionModel}) => ({
    
    getAllQuestions: async (examId) => {
        return await examModel.find({exam: examId}).exec() 
    }, 
    createQuestion: async (exam) => {
         
    },
    updateQuestion: async (exam) => {

    },
    deleteQuestion: async (id) => {

    }

})