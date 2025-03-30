const mongoose = require('mongoose'); // Erase if already required
const {COLLECTION_LIST} = require('../../enum/collection.enum');
const { REACT_TYPE } = require('../../enum/react.enum');


const COLLECTION_NAME = 'Reacts';
const DOCUMENT_NAME = 'React';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
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
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION_LIST.POSTS,
        required: true
    }
}, 
{
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);