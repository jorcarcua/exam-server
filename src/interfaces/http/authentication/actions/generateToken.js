const jwt = require('jsonwebtoken');

module.exports = ({ config }) => (user) => {
  const payload = {
    sub: user._id,
    exp: Date.now() + parseInt(config.JWT_LIFETIME, 10),
    username: user.username,
  };
  const token = jwt.sign(JSON.stringify(payload), config.JWT_SECRET, {
    algorithm: config.JWT_ALGORITHM,
  });
  return token;
};
