const Router = require('express')
const socketController = require('../../controllers/general/socket.controller')
const { checkUser } = require('../../middleware/auth.middleware')

const router = new Router()

router.post('/join/user-room', checkUser, socketController.joinUserRoom)
router.post('/join/conv-room', checkUser, socketController.joinConversationRoom)
router.post('/leave/user-room', checkUser, socketController.leaveUserRoom)
router.post('/leave/conv-room', checkUser, socketController.leaveConversationRoom)

module.exports = router
