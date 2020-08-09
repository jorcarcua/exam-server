const router = require('express').Router();
const { EXAM_NOT_FOUND, INTERNAL_ERROR } = require('./constants');
const { simulateDelay } = require('./utils');
const comonBuilder = require('./common');

// eslint-disable-next-line no-unused-vars
const examRouter = ({ logger, authMiddlewares, BaseError, actions }) => {
  const { handleError } = comonBuilder({ BaseError });

  router.get(
    '/',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const params = req.query;
        // Simulate a delay for testing purposes in the front end
        await simulateDelay(1000);

        const examList = await actions.getExamsByUser(params, req.user._id);
        if (examList) {
          res.status(200).json(examList);
        } else {
          res.status(200).json([]);
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  router.get(
    '/:id',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const result = await actions.findExam(req.params.id);
        if (result) {
          res.status(200).json(result);
        } else {
          next(new BaseError(404, EXAM_NOT_FOUND));
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  router.post(
    '/',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const exam = req.body;
        exam.user = req.user.id;
        const result = await actions.createExam(exam);

        if (result) {
          res.status(201).json(result);
        } else {
          next(new BaseError(500, INTERNAL_ERROR));
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  router.put('/:id', async (req, res, next) => {
    try {
      const exam = req.body;
      const result = await actions.updateExam(req.params.id, exam);
      if (result) {
        res.status(200).json(result);
      } else {
        next(new BaseError(404, EXAM_NOT_FOUND));
      }
    } catch (error) {
      handleError(error, next);
    }
  });

  router.delete(
    '/:id',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const result = await actions.deleteExam(req.params.id);
        if (!result) {
          throw new BaseError(404, EXAM_NOT_FOUND);
        }
        res.status(200).json(result);
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  // Questions

  router.get(
    '/:id/questions',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const result = await actions.getQuestionsExam(req.params.id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(200).json([]);
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  router.get(
    '/:id/questions/random',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const result = await actions.randomQuestion(req.params.id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(200).json([]);
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  router.post(
    '/:id/questions',
    authMiddlewares.ensureAuthenticated,
    async (req, res, next) => {
      try {
        const question = req.body;
        const result = await actions.createQuestion(req.params.id, question);

        if (result) {
          res.status(201).json(result);
        } else {
          next(new BaseError(500, INTERNAL_ERROR));
        }
      } catch (error) {
        handleError(error, next);
      }
    }
  );

  return router;
};

module.exports = examRouter;
