const { NotFoundException, BadRequest } = require("../errors/exception")
const Post = require("../models/socialModel/Post");
const { slugify } = require("../utils/normalizeString");
const Location = require('../models/generalModel/Location')
const User = require('../models/generalModel/user.model');
const postRepository = require("../repository/postRepository");

const populateOptions = [
    { path: 'authorId', select: 'userName userAvatar' },
    { path: 'locationId', select: 'name' },
    { path: 'userTagIds', select: 'userName'}
]

const create = async (postData) => {

    const { authorId, content, locationId, images, videos, tripType, travelSeason, privacyLevel, userTagIds, bannedUsers } = postData;

    const [location, author] = await Promise.all([
        Location.findById(locationId).select('name'),
        User.findById(authorId).select('userName'),
    ]);

    const slug = slugify(author.userName + " "  + content + " " + location.name)

    const post = new Post({
        authorId, content, slug, 
        locationId, images, videos, 
        tripType, travelSeason, privacyLevel, 
        userTagIds, bannedUsers
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


// const getByHashTag = async (hashtag) => {
//     const posts = await Post.find()
//     if(posts.length === 0) {
//         throw new NotFoundException();
//     } 
//     return posts;
// }

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

const deletePost = async (id) => {
    const post = await postRepository.deletePost(id)
    return post;
}

module.exports = {
    create,
    getAll,
    getById,
    getByLocationId,
    getByAuthorId,
    update,
    deletePost
}