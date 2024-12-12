const mongoose = require('mongoose');
const Location = require('./Location')
const Schema = mongoose.Schema;

const UCollectionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    name: {type: String, required: true},
    item: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}]
    
}, {collection: 'LocationCollection'});

const LocationCollection = mongoose.model('LocationCollection', UCollectionSchema);
module.exports = LocationCollection
