const mongoose = require('mongoose')
const {db: {uri}} = require('../config/mongodb.config')
const mongoURL = `mongodb+srv://${uri}`;


class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if(1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }
        mongoose.connect(mongoURL)
        .then(console.log("Db is connected"))
        .catch(error => console.log(error));
    }

    //Singleton to make sure that we only have one connection to database
    static getInstance() {
        if(!Database.instance)
            Database.instance = new Database()
        return Database.instance
    }
}

const instanceMongoDb = Database.getInstance()
module.exports = instanceMongoDb
