module.exports = ({ config, BaseError, checkCredentials, findUser }) => ({
  authMiddlewares: {
    authMiddleware: require('./middlewares/authMiddleware')({
      config,
      checkCredentials,
      findUser,
    }),
    ensureAuthenticated: require('./middlewares/ensureAuthenticated')({
      BaseError,
    }),
  },
  authActions: {
    authenticate: require('./actions/authenticate'),
    generateToken: require('./actions/generateToken')({ config }),
  },
});
