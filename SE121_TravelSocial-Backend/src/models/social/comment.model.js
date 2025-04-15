const mongoose = require('mongoose'); // Erase if already required
const { COLLECTION_LIST } = require('../../enum/collection.enum');

const COLLECTION_NAME = 'Comments';
const DOCUMENT_NAME = 'Comment'

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { _id: false })

const videoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { _id: false })

// Declare the Schema of the Mongo model
var commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION_LIST.POSTS,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION_LIST.USER,
        required:true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION_LIST.COMMENT,
        default: null
    },
    mention: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: COLLECTION_LIST.USER,
    },
    images: {
        type: [imageSchema],
        default: []
    },
    videos: {
        type: [videoSchema],
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, commentSchema);