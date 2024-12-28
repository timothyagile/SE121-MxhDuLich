const {Router} = require('express')
const authController = require('../controllers/conversationController')
const router = Router()

router.get('/conversation/:userId', authController.findUserConversation)
router.get('/conversation/:firstId/:secondId', authController.findConversations)
router.post('/conversation', authController.createConversation)

module.exports = router