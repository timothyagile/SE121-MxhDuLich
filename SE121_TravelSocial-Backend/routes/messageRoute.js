const Router = require('express')
const messageController = require('../controllers/messageController')

const router = new Router()

router.get('/api/message', messageController.getAllMessage)
router.get('/api/message/:userId', messageController.getMessageByUserId)
router.post('/api/message', messageController.createMessage)
router.put('/api/message/:id', messageController.updateMessage)
router.delete('/api/message/:id', messageController.deleteMessage)

module.exports = router
