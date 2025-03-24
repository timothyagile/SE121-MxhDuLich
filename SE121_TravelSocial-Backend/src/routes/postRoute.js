const {Router} = require('express');
const postController = require('../controllers/postController')
const {checkUser} = require('../middleware/authMiddleware');
const {asyncHandler} = require('../middleware/asyncFunction')

const router = Router();

/*
- partition 
- get by hashtag

    *this is post content*
    #abc #cdb #dck  

- get by word
- update
- delete: hard delete, soft delete
- new feed algorithms
*/

router.post('/posts', checkUser, asyncHandler(postController.createPost));

router.get('/posts', checkUser ,asyncHandler(postController.getAll));

router.get('/posts/p/:id', asyncHandler(postController.getById));

router.get('/posts/location/:locationId', asyncHandler(postController.getByLocationId));

router.get('/posts/author/:authorId', asyncHandler(postController.getByAuthorId));

router.put('/posts/:id', asyncHandler(postController.updatePost));

/* Soft delete */
router.delete("/posts/:id", asyncHandler(postController.deletePost));


module.exports = router