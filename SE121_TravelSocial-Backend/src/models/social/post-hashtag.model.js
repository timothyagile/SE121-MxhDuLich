const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'PostHashTags';
const DOCUMENT_NAME = 'PostHashTag'
const POST_REF = 'Posts'
const HASHTAG_REF = 'Hashtags'

// Declare the Schema of the Mongo model
var postHashTagSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: POST_REF
    },
    hashTagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: HASHTAG_REF
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postHashTagSchema);