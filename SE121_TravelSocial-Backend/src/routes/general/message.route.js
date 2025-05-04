const Router = require('express')
const messageController = require('../../controllers/general/message.controller')
const { checkUser } = require('../../middleware/auth.middleware')

const router = new Router()

router.post('/message', checkUser, messageController.createMessage)
router.get('/message/:conversationId', checkUser, messageController.getMessageByConvId)
router.get('/ping', messageController.ping)


module.exports = router
