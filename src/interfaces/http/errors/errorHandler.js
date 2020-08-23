const BaseError = require('./BaseError');

const errorHandler = ({ logger }) => {
  const isTrustedError = (error) => {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  };

  return {
    handleError: (err, res) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
      }

      let { statusCode, message } = err;

      if (!isTrustedError(err)) {
        statusCode = 500;
        message = 'An error has ocurred in the server';

        // TODO: treat not operational
      }
      logger.error(err.message);
      const result = res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
      });
      return result;
    },
    notFoundHandler: (req, res) => {
      return res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: 'endpoint not found',
      });
    },
  };
};

module.exports = errorHandler;
