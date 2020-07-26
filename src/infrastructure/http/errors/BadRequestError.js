const HttpStatusCode = require('./HttpStatusCode')
const BaseError = require('./BaseError')

class BadRequestError extends BaseError {
    constructor(description = 'Bad Request' ){
        super(HttpStatusCode.BAD_REQUEST, description, true)
    }
}

module.exports = BadRequestError