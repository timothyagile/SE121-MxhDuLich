const { NotFoundException, BadRequest } = require("../../errors/exception")
const Post = require("../../models/social/post.model");
const { slugify } = require("../../utils/normalizeString");
const Location = require('../../models/general/location.model')
const User = require('../../models/general/user.model');
const postRepository = require("../../repository/post.repository");

const populateOptions = [
    { path: 'authorId', select: 'userName userAvatar' },
    { path: 'locationId', select: 'name' },
    { path: 'userTagIds', select: 'userName'}
]

const create = async (postData) => {

    const { authorId, content, locationId,
         images, videos, tripType, 
         travelSeason, privacyLevel, 
         userTagIds, bannedUsers, hashTags,
        type, sharedFrom, shareTo } = postData;

    const [location, author] = await Promise.all([
        Location.findById(locationId).select('name'),
        User.findById(authorId).select('userName'),
    ]);

    const slug = slugify(author.userName + " "  + content + " " + location.name)

    const post = new Post({
        authorId, content, slug, 
        locationId, images, videos, 
        tripType, travelSeason, privacyLevel, 
        userTagIds, bannedUsers, hashTags,
        type, sharedFrom, shareTo
    })

    console.log("Post::", post);

    const savedPost = await postRepository.create(post)

    if(!savedPost) {
        throw new BadRequest();
    }
    return savedPost;
}

const getAll = async () => {
    const posts = await postRepository.findAll({ isDeleted:false }, populateOptions)
    // const posts = await Post.find()
    // .populate({
    //     path: 'authorId', select: 'userName userAvatar'
    // })
    // .populate({
    //     path: 'locationId', select: 'name'
    // })
    // .populate({
    //     path: 'userTagIds', select: 'userName'
    // })

    if(posts.length === 0) {
        throw new NotFoundException();
    } 
    return posts;
}

const getById = async (id) => {
    const post = await postRepository.findById(id, populateOptions)

    if(!post || post.isDeleted) {
        throw new NotFoundException();
    }

    return post
}

const getByLocationId = async (locationId) => {
    const posts = await postRepository.findAll({locationId, isDeleted:false}, populateOptions)
    if(posts.length === 0) {
        throw new NotFoundException();
    } 
    return posts;
}

// const getByWord = async (word) => {
//     const posts = await Post.find({slug: {$regex: word, $options: 'i'}})
//     if(posts.length === 0) {
//         throw new NotFoundException();
//     } 
//     return posts;
// }


const getByHashTag = async (hashtag) => {
    const posts = await postRepository.findPostByHashTag(hashtag)
    return posts;
}

const getByAuthorId = async (authorId) => {
    const posts = await postRepository.findAll({authorId, isDeleted:false}, populateOptions)
    if(posts.length === 0) {
        throw new NotFoundException();
    } 
    return posts;
}

const update = async (id, updatePost) => {
    //Update data
    let post = await postRepository.update(id, updatePost)

    //Neu co thay doi ve content hoac dia diem: Cap nhat lai slug
    if(updatePost.content || updatePost.locationId) {
        
        const [location, author] = await Promise.all([
            Location.findById(post.locationId).select('name'),
            User.findById(post.authorId).select('userName'),
        ]);
    
        const newSlug = slugify(author.userName + " "  + post.content + " " + location.name)
        console.log("Post update::Update slug::", newSlug)

        post.slug = newSlug
    }

    if(!post) { throw new NotFoundException(); }
    return post;
}

const updateStat = async (postId, attribute, increment) => {
    const updatedPost = await postRepository.updateStat(postId, attribute, increment)
    return updatedPost;
}

const deletePost = async (id) => {
    const post = await postRepository.deletePost(id)
    return post;
}

const sharePost = async (sharePostData) => {
    const { originalPostId, userId,
        shareTo, content = '', 
        userTagIds = [], type } = sharePostData

    const originalPost = await Post.findOne({ _id: originalPostId, isDeleted: false });
    
    if (!originalPost) throw new NotFoundException('Bài viết không tồn tại hoặc đã bị xoá');

    // Tái sử dụng create()
    const sharedPost = await create({
        authorId: userId,
        content,
        userTagIds,
        shareTo,
        type,
        locationId: originalPost.locationId,
        images: originalPost.images, // hoặc giữ nguyên tuỳ logic
        videos: originalPost.videos,
        bannedUsers: [],
        tripType: originalPost.tripType,
        travelSeason: originalPost.travelSeason,
        privacyLevel: originalPost.privacyLevel,
        hashTags: originalPost.hashTags,
        sharedFrom: originalPost._id,
    });

    await Post.findByIdAndUpdate(originalPostId, {
        $inc: { 'stat.shareCount': 1 },
        $set: { 'stat.lastInteraction': new Date() }
    });

    return sharedPost;
};

module.exports = {
    create, getAll, getById,
    getByLocationId, getByAuthorId, getByHashTag,
    update, updateStat, deletePost,
    sharePost
}