module.exports = ({ questionRepository, questionValidator }) => async (
  id,
  question
) => {
  const paramValidationResult = await questionValidator.validateParams({
    id,
  });

  if (paramValidationResult.error) {
    throw paramValidationResult.error;
  }

  const bodyValidationResult = await questionValidator.validateBody(question);

  if (bodyValidationResult.error) {
    throw bodyValidationResult.error;
  }

  return questionRepository.updateQuestion(id, question);
};
