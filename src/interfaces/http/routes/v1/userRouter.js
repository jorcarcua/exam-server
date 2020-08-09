const router = require('express').Router();
const { BAD_CREDENTIALS, INTERNAL_ERROR } = require('./constants');
const commonBuilder = require('./common');

// eslint-disable-next-line no-unused-vars
const userRouter = ({ logger, authActions, BaseError, actions }) => {
  const { handleError } = commonBuilder({ BaseError });

  router.post('/login', (req, res, next) => {
    try {
      // eslint-disable-next-line consistent-return
      authActions.authenticate(req, res, (error, user) => {
        if (error && error.message !== 'AuthenticationError') {
          return next(error);
        }

        if (!user) {
          return next(new BaseError(401, BAD_CREDENTIALS, true));
        }
        const token = authActions.generateToken(user);
        const result = {
          user,
          token,
        };
        res.json({ data: { token: result.token } });
      });
    } catch (error) {
      handleError(error, next);
    }
  });

  router.post('/register', async (req, res, next) => {
    try {
      const result = await actions.register(req.body);
      if (result) {
        res.status(201).json(result);
      } else {
        next(new BaseError(500, INTERNAL_ERROR));
      }
    } catch (error) {
      handleError(error, next);
    }
  });

  return router;
};

module.exports = userRouter;
