class BaseError extends Error {
    constructor(statusCode, message, isOperational){
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;

        //To capture stacktrace:
        //Error.captureStackTrace(this);
    }
}

module.exports = BaseError