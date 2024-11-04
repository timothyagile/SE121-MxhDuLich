const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const businessSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner', // Thay thế bằng tên model của owner nếu có
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lisenceld: {
        type: String,
        required: true
    }
}, {collection: 'Business'})

const Business = mongoose.model('Business', businessSchema)
module.exports = Business