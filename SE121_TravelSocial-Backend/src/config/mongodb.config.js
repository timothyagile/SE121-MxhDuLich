require('dotenv').config()
const ENV = process.env.NODE_ENV || 'dev'

const dev = {
    app: {
        port: process.env.PORT_DEV
    },
    db: {
        uri: process.env.MONGO_URI_DEV
    }
}

const prod = {
    app: {
        port: process.env.PORT_PROD
    },
    db: {
        uri: process.env.MONGO_URI_PROD
    }
}

const config = {
    dev,
    prod
}

module.exports = config[ENV]