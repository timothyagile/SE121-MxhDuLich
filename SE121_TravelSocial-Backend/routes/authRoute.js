const {Router} = require('express')
const authController = require('../controllers/authController')
const router = Router()


router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/signin', authController.signin_get)
router.post('/signin', authController.signin_post)
router.get('/logout', authController.logout_get)

module.exports = router