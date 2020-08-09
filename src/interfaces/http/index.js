const BaseError = require('./errors/BaseError');
const errorHandlerBuilder = require('./errors/errorHandler');
const routerBuilder = require('./routes');
const authenticationBuilder = require('./authentication');
const serverBuilder = require('./server');

module.exports = ({ config, database, logger }) => (actions) => {
  const { authMiddlewares, authActions } = authenticationBuilder({
    config: config.authentication,
    BaseError,
    checkCredentials: actions.checkCredentials,
    findUser: actions.findUser,
  });
  const errorHandler = errorHandlerBuilder({ logger });
  const router = routerBuilder({
    logger,
    authMiddlewares,
    authActions,
    BaseError,
    actions,
  });

  return serverBuilder({
    config: config.server,
    database,
    logger,
    authMiddlewares,
    router,
    errorHandler,
  });
};
