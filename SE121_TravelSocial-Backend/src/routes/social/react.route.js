const {Router} = require('express')
const router = new Router();

const reactController = require('../../controllers/social/react.controller')

const { asyncHandler } = require('../../middleware/asyncFunction');
const { checkUser } = require('../../middleware/auth.middleware');

router.post('/react', checkUser ,asyncHandler(reactController.create))

module.exports = router 