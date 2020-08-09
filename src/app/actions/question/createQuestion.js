module.exports = ({ questionRepository, questionValidator }) => async (
  examId,
  question
) => {
  const paramValidationResult = await questionValidator.validateParams({
    exam: examId,
  });

  if (paramValidationResult.error) {
    throw paramValidationResult.error;
  }

  const bodyValidationResult = await questionValidator.validateBody(question);

  if (bodyValidationResult.error) {
    throw bodyValidationResult.error;
  }
  const newQuestion = question;
  newQuestion.exam = examId;

  return questionRepository.createQuestion(newQuestion);
};
