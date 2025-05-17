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

        console.log("PostRepository::updateStat", postId, attribute, increment)
        try {
            // Kiểm tra bài đăng tồn tại trước khi cập nhật
            const existingPost = await Post.findById(postId).select("_id stat");
            console.log("Existing post stats:", existingPost ? existingPost.stat : null);
            
            const post = await Post
            .findByIdAndUpdate(postId, 
                {
                    $inc: {
                        [`stat.${attribute}`]: increment,
                    },
                    "stat.lastInteraction": new Date()
                },
                { new: true } // Trả về document sau khi đã cập nhật
            )
            .select("_id stat")

            if(!post) { 
                console.log(`Post not found with ID: ${postId}`);
                throw new NotFoundException();
            }
            
            console.log("Updated post stats:", post.stat);
            return post;
        } catch (error) {
            console.error("Error in updateStat:", error);
            throw error;
        }
    }
}

module.exports = new PostRepository();
