const {Router} = require('express')
const router = new Router();

const hashTagController = require('../../controllers/social/hashtag.controller');
const { asyncHandler } = require('../../middleware/asyncFunction');

router.post('/hashtag', asyncHandler(hashTagController.create))

module.exports = router