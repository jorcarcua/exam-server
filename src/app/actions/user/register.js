const bcrypt = require('bcrypt');

module.exports = ({ userRepository, userValidator, config }) => async (
  user
) => {
  const generateHash = (password, rounds) => {
    const hash = bcrypt.hashSync(password, parseInt(rounds, 10));
    return hash;
  };

  const bodyValidationResult = await userValidator.validateBody(user);

  if (bodyValidationResult.error) {
    throw bodyValidationResult.error;
  }

  const hash = generateHash(user.password, config.BCRYPT_ROUNDS);

  const userToCreate = {
    username: user.username,
    password: hash,
  };
  return userRepository.createUser(userToCreate);
};
