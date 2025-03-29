const {Router} = require('express')
const router = new Router();

const hashTagController = require('../../controllers/social/hashtag.controller')

router.post('/hashtag', hashTagController.create)

module.exports = router