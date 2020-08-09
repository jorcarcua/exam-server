module.exports = ({ examRepository, examValidator }) => async (id) => {
  const { error } = await examValidator.validateParams({ id });

  if (error) {
    throw error;
  } else {
    return examRepository.findExam(id);
  }
};
