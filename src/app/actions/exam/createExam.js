module.exports = ({ examRepository, examValidator }) => async (exam) => {
  const bodyValidationResult = await examValidator.validateBody(exam);

  if (bodyValidationResult.error) {
    throw bodyValidationResult.error;
  }

  return examRepository.createExam(exam);
};
