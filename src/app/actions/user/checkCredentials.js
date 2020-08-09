module.exports = ({ userRepository }) => async (username, password) => {
  const user = await userRepository.findUser({ username });
  if (user) {
    if (!userRepository.verifyPassword(user, password)) {
      const error = new Error('AuthenticationError');
      error.details = 'username or password not correct';
      throw error;
    }
  }
  return user;
};
