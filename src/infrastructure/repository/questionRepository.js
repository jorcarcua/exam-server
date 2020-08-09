module.exports = ({ QuestionModel }) => ({
  findQuestion: async (questionId) => {
    return QuestionModel.find({ _id: questionId }).exec();
  },
  getAllQuestions: async (examId) => {
    return QuestionModel.find({ exam: examId }).exec();
  },
  createQuestion: async (question) => {
    const newQuestion = new QuestionModel(question);
    return newQuestion.save();
  },
  updateQuestion: async (id, question) => {
    return QuestionModel.findByIdAndUpdate(id, question, {
      new: true,
    }).exec();
  },
  deleteQuestion: async (id) => {
    return QuestionModel.findOneAndDelete({ _id: id }).exec();
  },
  getQuestionsByExam: async (examId) => {
    return QuestionModel.find({ exam: examId }).exec();
  },
  getQuestionCount: async (examId) => {
    return QuestionModel.countDocuments({ exam: examId }).exec();
  },
  generateRandomQuestion: async (examId, random) => {
    return QuestionModel.findOne({ exam: examId }).skip(random).exec();
  },
});
