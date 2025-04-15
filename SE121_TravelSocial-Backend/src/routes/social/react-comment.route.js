const {Router} = require('express')
const router = new Router();

const reactCommentController = require('../../controllers/social/react-comment.controller');
const { checkUser } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../middleware/asyncFunction')

router.post('/react/comment', checkUser, asyncHandler(reactCommentController.reactToComment))
router.get('/react/comment/:commentId', asyncHandler(reactCommentController.getByCommentId))

module.exports = router