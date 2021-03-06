module.exports = ({ questionRepository, questionValidator }) => async (id) => {
  const { error } = await questionValidator.validateParams({ id });
  if (error) {
    throw error;
  }
  return questionRepository.deleteQuestion(id);
};
