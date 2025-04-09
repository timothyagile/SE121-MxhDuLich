const httpStatusCode = require('../constants/httpStatusCode')
const reasonPhrase = require('../constants/reasonPhrases')

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class NotFoundException extends ErrorResponse {
    constructor(message = reasonPhrase.NOT_FOUND, statusCode = httpStatusCode.NOT_FOUND) {
        super(message, statusCode);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message=reasonPhrase.FORBIDDEN, statusCode = httpStatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}

class BadRequest extends ErrorResponse{
    constructor(message=reasonPhrase.BAD_REQUEST, statusCode = httpStatusCode.BAD_REQUEST) {
        super(message, statusCode);
    }
}

module.exports = {
    NotFoundException,
    ForbiddenError,
    BadRequest
}