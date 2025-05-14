const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    locationId: {type: mongoose.Schema.Types.ObjectId, Ref: 'Location', required: true},
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    unit: {type: String, required: true},
    isAvailable: {type: Boolean, default: true},
    icon: {type: String, default: 'https://res.cloudinary.com/dqj8v4x2g/image/upload/v1698236480/TravelSocial/service_icon_default.png'},
}, {collection: 'Service'});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service

