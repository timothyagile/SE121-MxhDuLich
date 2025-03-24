const Router = require('express')
const messageController = require('../../controllers/general/message.controller')

const router = new Router()

router.post('/message', messageController.createMessage)
router.get('/message/:conversationId', messageController.getMessageByConvId)


module.exports = router
