const {Router} = require('express')
const authController = require('../../controllers/general/auth.controller')
const uploadMiddleware = require('../../middleware/cloudinary.middleware')
const { checkUser } = require('../../middleware/auth.middleware')
const { asyncHandler } = require('../../middleware/asyncFunction')
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
router.put('/user/avt', checkUser, asyncHandler(authController.updateAvata))
router.delete('/user/delete/:id', authController.deleteUser)

module.exports = router