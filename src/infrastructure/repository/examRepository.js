module.exports = ({ ExamModel }) => ({
  getExamsByUser: async (userId) => {
    return ExamModel.find({ user: userId }).exec();
  },
  findExam: async (examId) => {
    return ExamModel.findOne({ _id: examId }).exec();
  },
  existsExamWithTitle: async (title) => {
    let result = false;
    const exam = await ExamModel.findOne({ title }).exec();
    if (exam) {
      result = true;
    }
    return result;
  },
  createExam: async (exam) => {
    const newExam = new ExamModel(exam);
    return newExam.save();
  },
  updateExam: async (id, exam) => {
    return ExamModel.findByIdAndUpdate(id, exam, { new: true }).exec();
  },
  deleteExam: async (id) => {
    return ExamModel.findOneAndDelete({ _id: id }).exec();
  },
});
