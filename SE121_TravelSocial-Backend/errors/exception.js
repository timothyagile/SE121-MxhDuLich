class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundException";
        this.statusCode = 404;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

module.exports = {
    NotFoundException,
    ForbiddenError
}