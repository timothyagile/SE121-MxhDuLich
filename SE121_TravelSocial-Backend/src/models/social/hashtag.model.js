const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME = 'Hashtags';
const DOCUMENT_NAME = 'Hashtag'
const POST_REF = 'Posts'

// Declare the Schema of the Mongo model
var hashTagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    stat: {
        dailyPostCount: {
            type: Number,
            default: 0
        },
        weeklyPostCount: {
            type: Number,
            default: 0
        },
        monthlyPostCount: {
            type: Number,
            default: 0
        },
    },
    isTrending: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, hashTagSchema);