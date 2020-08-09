module.exports = ({ questionRepository, questionValidator }) => async (
  examId
) => {
  const { error } = await questionValidator.validateParams({
    exam: examId,
  });
  if (error) {
    throw error;
  } else {
    const questionCount = await questionRepository.getQuestionCount(examId);
    const random = Math.floor(Math.random() * questionCount);
    return questionRepository.generateRandomQuestion(examId, random);
  }
};
