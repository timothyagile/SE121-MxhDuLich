const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UCollectionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        require: true,
    }
}, {collection: 'LocationCollection'});

const LocationCollection = mongoose.model('LocationCollection', UCollectionSchema);
module.exports = LocationCollection
