const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ExamSchema = new Schema (
    {    
        title: String,
        user: {type:Schema.Types.ObjectId, ref: 'User'},
        numberQuestions:{type: Number, default: 0},
        success: {type: Number, default: 0},
        failure: {type: Number, default: 0}
    } 
)

ExamSchema.method('transform', function() {
    var obj = this.toObject();
    console.log('desde schema')
    console.log(obj)
    console.log(obj._id)
 
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
 
    return obj;
});
 


module.exports = mongoose.model('Exam', ExamSchema)