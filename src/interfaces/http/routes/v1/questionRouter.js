const router = require('express').Router();
const { QUESTION_NOT_FOUND } = require('./constants');

// eslint-disable-next-line no-unused-vars
const questionRouter = ({ logger, authMiddlewares, BaseError, actions }) => {
  const { handleError } = require('./common')({ BaseError });

  router.get(
    '/:id',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const result = await actions.findQuestion(req.params.id);
        if (result) {
          res.status(200).json(result);
        } else {
          next(new BaseError(404, QUESTION_NOT_FOUND));
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  router.put(
    '/:id',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const question = req.body;
        const result = await actions.updateQuestion(req.params.id, question);
        if (result) {
          res.status(200).json(result);
        } else {
          next(new BaseError(404, QUESTION_NOT_FOUND));
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  router.delete(
    '/:id',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const result = await actions.deleteQuestion(req.params.id);
        if (!result) {
          throw new BaseError(404, QUESTION_NOT_FOUND);
        }
        res.status(200).json(result);
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  return router;
};

module.exports = questionRouter;
