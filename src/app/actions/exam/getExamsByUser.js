module.exports = ({ examRepository, examValidator }) => async (
  params,
  userId
) => {
  const { error } = await examValidator.validateParams(params);
  if (error) {
    throw error;
  } else {
    return examRepository.getExamsByUser(userId);
  }
};
