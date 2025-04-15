const {Router} = require('express')
const router = new Router();

const commentController = require('../../controllers/social/comment.controller');
const { asyncHandler } = require('../../middleware/asyncFunction');
const { checkUser } = require('../../middleware/auth.middleware');

// React
router.post('/comment', checkUser ,asyncHandler(commentController.createComment));
router.get('/comment/post/:postId', asyncHandler(commentController.getCommentsByPost));
router.put('/comment/:commentId', checkUser, asyncHandler(commentController.updateComment));
// router.delete('/comment/:commentId', commentController.deleteComment);
// router.get('/comment/:commentId/interaction', commentController.getCommentInteraction);

module.exports = router;
