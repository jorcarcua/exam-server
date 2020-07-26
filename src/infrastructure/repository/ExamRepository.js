

module.exports = ({examModel}) => ({
    
        getExamsByUser: async (userId) => {  
             return await examModel.find({user: userId}).exec()  
        }, 
        findExam: async (examId) => {  
             return await examModel.findOne({_id: examId}) .exec()  
        },
        existsExamWithTitle: async (title) => {
             let result = false 
             const exam = await examModel.findOne({title: title}).exec()  
             if(exam){
                  result = true
             } 
             return result
        },
        createExam: async (exam) => {  
             const newExam = new examModel (exam)
             return await newExam.save();   
        },
        updateExam: async (id, exam) => {  
             return await examModel.findByIdAndUpdate(id, exam, {new:true}).exec()
        },
        deleteExam: async (id) => {   
             return  await examModel.findOneAndDelete({_id: id}).exec()  
        }  
})

const getExam = async (examModel, id) => {
        return  examModel.findById(id)      
}