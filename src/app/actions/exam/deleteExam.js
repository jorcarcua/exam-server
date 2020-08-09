module.exports = ({ examRepository, examValidator }) => async (id) => {
  const { error } = await examValidator.validateParams({ id });
  if (error) {
    throw error;
  }
  return examRepository.deleteExam(id);
};
