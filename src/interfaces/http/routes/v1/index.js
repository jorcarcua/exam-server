const router = require('express').Router();
const examRouterBuilder = require('./examRouter');
const questionRouterBuilder = require('./questionRouter');
const userRouterBuilder = require('./userRouter');

module.exports = ({
  logger,
  authMiddlewares,
  authActions,
  BaseError,
  actions,
}) => {
  router.use(
    '/exams',
    examRouterBuilder({ logger, authMiddlewares, BaseError, actions })
  );
  router.use(
    '/questions',
    questionRouterBuilder({
      logger,
      authMiddlewares,
      BaseError,
      actions,
    })
  );
  router.use(
    '/user',
    userRouterBuilder({
      logger,
      authActions,
      BaseError,
      actions,
    })
  );

  return router;
};
