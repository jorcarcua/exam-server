module.exports = ({ questionRepository, questionValidator }) => async (
  examId
) => {
  const { error } = await questionValidator.validateParams({
    exam: examId,
  });
  if (error) {
    throw error;
  } else {
    return questionRepository.getQuestionsByExam(examId);
  }
};
