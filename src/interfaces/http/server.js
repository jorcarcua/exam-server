const express = require('express');
const cors = require('cors');

const server = ({ config, logger, authMiddlewares, router, errorHandler }) => ({
  start: () => {
    logger.info('Starting server');
    const app = express();
    app.use(cors());
    app.use(authMiddlewares.authMiddleware);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(router);
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      errorHandler.handleError(err, res);
    });
    app.use((err, res, next) => {
      errorHandler.notFoundHandler(err, res, next);
    });

    const port = config.PORT;
    app.listen(port, () => {
      logger.info(`listening in port ${port}`);
    });
  },
});

module.exports = server;
