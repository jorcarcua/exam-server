const errorTypes = {
  ValidationSyntaxError: 'ValidationSyntaxError',
  ValidationConflictError: 'ValidationConflictError',
  AuthenticationError: 'AuthenticationError',
};

module.exports = ({ BaseError }) => ({
  handleError: (error, next) => {
    switch (error.message) {
      case errorTypes.ValidationSyntaxError:
        return next(new BaseError(400, error.details));
      case errorTypes.ValidationConflictError:
        return next(new BaseError(404, error.details));
      case errorTypes.AuthenticationError:
        return next(new BaseError(401, error.details));
      default:
        return next(error);
    }
  },
});
