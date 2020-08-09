module.exports = ({ userRepository }) => async (filter) => {
  return userRepository.findUser(filter);
};
