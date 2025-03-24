const httpStatusCode = require('../constants/httpStatusCode')
const reasonPhrase = require('../constants/reasonPhrases')

class SuccessResponse {
    constructor({message, statusCode = httpStatusCode.OK, 
        reasonStatusCode = reasonPhrase.OK, metadata = {}}) {
            this.message = !message ? reasonStatusCode : message
            this.status = statusCode
            this.metadata = metadata
    }
    send(res, header = {}) {
        return res.status(this.status).json( this )
    }
}

class OK extends SuccessResponse{
    constructor({message, metadata = {}}) {
            super({message, metadata})
    }
}

class CREATED extends SuccessResponse { 
    constructor({message, statusCode = httpStatusCode.CREATED, 
        reasonStatusCode = reasonPhrase.CREATED, metadata = {}}) {
            super({message, statusCode, reasonStatusCode, metadata})
        }
}

module.exports = {
    OK,
    CREATED
}