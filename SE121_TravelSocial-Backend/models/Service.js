const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    unit: {type: String, required: true},
    isAvailable: {type: Boolean, default: true}
}, {collection: 'Service'});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service
