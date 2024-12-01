const Router = require('express')
const uploadController = require('../controllers/uploadController')
const router = new Router()

router.get('/upload', uploadController.uploadImage)

module.exports = router