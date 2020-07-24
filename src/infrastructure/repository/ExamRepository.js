

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
             console.log(`id en el reposi ${id}`)
             const result = await examModel.findOneAndDelete({_id: id}).exec()
             console.log('en respostiroy')
             console.log(result)
             return result
            // let examToDelete = getExam(exam.id)
            // return await examToDelete.remove()
        }

})

const getExam = async (examModel, id) => {
        return  examModel.findById(id)      
}