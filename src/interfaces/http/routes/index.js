const router = require('express').Router();
const routerBuilder = require('./v1');

module.exports = ({
  logger,
  authMiddlewares,
  authActions,
  BaseError,
  actions,
}) => {
  const routerV1 = routerBuilder({
    logger,
    authMiddlewares,
    authActions,
    BaseError,
    actions,
  });

  router.use('/v1', routerV1);

  return router;
};
