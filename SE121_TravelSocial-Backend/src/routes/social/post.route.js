const {Router} = require('express');
const postController = require('../../controllers/social/post.controller')
const {checkUser} = require('../../middleware/auth.middleware');
const {asyncHandler} = require('../../middleware/asyncFunction')

const router = Router();

/*
- partition 
- get by word
- new feed algorithms
*/

router.post('/posts', checkUser, asyncHandler(postController.createPost));

router.get('/posts', checkUser ,asyncHandler(postController.getAll));

router.get('/posts/p/:id', asyncHandler(postController.getById));

router.get('/posts/location/:locationId', asyncHandler(postController.getByLocationId));

router.get('/posts/author/:authorId', asyncHandler(postController.getByAuthorId));

router.get('/posts/hashtag/:hashtag', asyncHandler(postController.getByHashTag));

router.put('/posts/:id', asyncHandler(postController.updatePost));
/* Soft delete */
router.delete("/posts/:id", asyncHandler(postController.deletePost));

//Share bài viết
router.post('/share', checkUser, postController.sharePostController);


module.exports = router