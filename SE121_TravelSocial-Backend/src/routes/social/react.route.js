const {Router} = require('express')
const router = new Router();

const reactController = require('../../controllers/social/react.controller')

const { asyncHandler } = require('../../middleware/asyncFunction');
const { checkUser } = require('../../middleware/auth.middleware');

router.post('/react', checkUser ,asyncHandler(reactController.create))

router.get('/react', asyncHandler(reactController.getByPostId));

// Route cụ thể hơn phải đặt trước route với tham số đường dẫn
router.get('/react/check', asyncHandler(reactController.checkUserReacted))

router.get('/react/:postId', asyncHandler(reactController.countReacts))

module.exports = router