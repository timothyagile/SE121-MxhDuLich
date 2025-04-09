const { NotFoundException } = require('../errors/exception');
const Post = require('../models/social/post.model');
const BaseRepository = require('./base.repository');

class PostRepository extends BaseRepository{

    constructor() {
        super(Post)
    }

    async deletePost(id) {
        const post = await Post.findById(id)
        if (!post) { throw new NotFoundException() }

        post.isDeleted = true
        post.deletedAt = new Date()

        return await post.save()
    }

    async findPostByHashTag(hashtag) {
        const posts = await Post
        .find({hashTags: hashtag})
        .sort({createdAt: -1})

        if (posts.length === 0) { throw new NotFoundException() }

        return posts
    }
    
    async updateStat(postId, attribute ,increment) {

        const post = await Post
        .findByIdAndUpdate(postId, 
            {
                $inc: {
                    [`stat.${attribute}`]: increment,
                },
                "stat.lastInteraction": new Date()
            }
        )
        .select("_id stat")

        if(!post) { throw new NotFoundException()}

        return post
    }
}

module.exports = new PostRepository();
