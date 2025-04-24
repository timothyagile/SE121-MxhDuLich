const mongoose = require('mongoose'); 
const {PRIVACY_LEVEL, TRAVEL_SEASON, TRIP_TYPE, SHARE_TARGET, POST_TYPE } = require('../../enum/post.enum')

const COLLECTION_NAME = 'Posts';
const DOCUMENT_NAME = 'Post'
const USER_REF = 'User'
const LOCATION_REF = 'Location'
const HASHTAG_REF = 'HashTag'

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
var postSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_REF,
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: LOCATION_REF,
    },
    tripType: {
        type: String,
        enum: TRIP_TYPE
    },  // "solo", "family", "couple", "friends", "business"
    travelSeason: {
        type: String,
        enum: TRAVEL_SEASON
    } ,
    images: {
        type: [imageSchema],
        default: []  
    },
    videos: {
        type: [videoSchema], 
        default:[]
    },
    privacyLevel: {
        type: String,
        enum: PRIVACY_LEVEL,
        default: PRIVACY_LEVEL.PUBLIC
    },
    userTagIds: { 
        type: [mongoose.Schema.Types.ObjectId],
        ref: USER_REF,
        required: true
    }, // Chỉ lưu ObjectId
    bannedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: USER_REF,
        default: []
    },
    hashTags: {
        type: [String]
    },
    stat: {
        viewCount: {
            type: Number,
            default: 0
        },
        reactCount: {
            type: Number,
            default: 0
        },
        commentsCount: {
            type: Number,
            default: 0
        },
        shareCount: {
            type: Number,
            default: 0
        },
        lastInteraction: { type: Date, default: Date.now }
    },
    type: {
        type: String,
        enum: POST_TYPE,
        default: POST_TYPE.ORIGINAL
    },
    sharedFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DOCUMENT_NAME,
        default: null
    },
    shareTo: {
        type: String,
        enum: SHARE_TARGET,
        default: null
    },
    isDeleted: { type: Boolean, default: false }, // Đánh dấu bài viết đã xoá
    deletedAt: { type: Date, default: null, index: { expires: '7d' } }, // Lưu thời gian xoá
}, 
{
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postSchema);
