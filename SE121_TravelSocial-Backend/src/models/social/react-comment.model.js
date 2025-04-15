const mongoose = require('mongoose'); // Erase if already required
const {COLLECTION_LIST} = require('../../enum/collection.enum');
const { REACT_TYPE } = require('../../enum/react.enum');


const COLLECTION_NAME = 'ReactComments';
const DOCUMENT_NAME = 'ReactComment';

// Declare the Schema of the Mongo model
var reactSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION_LIST.COMMENT,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION_LIST.USER,
        required: true
    },
    type: {
        type: String, 
        enum: REACT_TYPE,
        required: true
    },
}, 
{
    collection: COLLECTION_NAME,
    timestamps: true,   
});

module.exports = mongoose.model(DOCUMENT_NAME, reactSchema);
