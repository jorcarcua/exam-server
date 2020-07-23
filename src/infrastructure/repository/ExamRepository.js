

module.exports = ({examModel}) => ({
    
        getAllExams: async (userId) => { 
             return await examModel.find({user: userId}).exec() 
        }, 
        createExam: async (exam) => { 
             const newExam = new examModel (exam)
             return await newExam.save();   
        },
        updateExam: async (exam) => {
             let examToUpdate = getExam(exam.id)
             examToUpdate.set(exam)
             return await examToUpdate.save()
        },
        deleteExam: async (id) => {
             let examToDelete = getExam(exam.id)
             return await examToDelete.remove()
        }

})

const getExam = async (examModel, id) => {
        return  examModel.findById(id)      
}