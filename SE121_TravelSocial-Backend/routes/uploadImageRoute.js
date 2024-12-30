const {Router} = require('express');
const uploadImageController = require('../controllers/uploadImageController')
const uploadMiddleware = require('../middleware/cloudinaryMiddleware') 
const upload = uploadMiddleware('travel-social')
const router = Router();

router.post('/upload', upload.array('file', 10), uploadImageController.uploadImage)
router.delete('/upload/:folderId/:publicId', uploadImageController.deleteImage)

module.exports = router;