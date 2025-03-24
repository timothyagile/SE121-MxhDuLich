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
    
}

module.exports = new PostRepository();
