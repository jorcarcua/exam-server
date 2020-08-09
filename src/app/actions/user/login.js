module.exports = ({ authActions }) => (req, res, callback) => {
  return authActions.authenticate(req, res, (error, user) => {
    if (error || !user) {
      callback(error, null);
    } else {
      const token = authActions.generateToken(user);
      const result = {
        user,
        token,
      };
      callback(null, result);
    }
  });
};
