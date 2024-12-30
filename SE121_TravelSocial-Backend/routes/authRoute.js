const {Router} = require('express')
const authController = require('../controllers/authController')
const uploadMiddleware = require('../middleware/cloudinaryMiddleware')
const upload = uploadMiddleware('travel-social')
const router = Router()


router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/signin', authController.signin_get)
router.post('/signin', authController.signin_post)
router.get('/logout', authController.logout_get)

router.get('/user/getall', authController.getAllUser)
router.get('/user/getbyid/:id', authController.getUserById)
router.put('/user/update/:id', authController.updateUser)
router.put('/user/avt/:id', upload.single('file'), authController.updateAvata)
router.delete('/user/delete/:id', authController.deleteUser)

module.exports = router