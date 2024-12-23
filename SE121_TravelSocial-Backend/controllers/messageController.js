const messageSvc = require('../services/messageSvc')
module.exports.getAllMessage = async (req, res, next) => {
    try {
        const result = await messageSvc.getAllMessage()
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getMessageByUserId = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const result = await messageSvc.getMessageByUserId(userId)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.createMessage = async (req, res, next) => {
    const {senderId, receiverId, message} = req.body
    try {
        const result = await messageSvc.createMessage({senderId, receiverId, message})
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.updateMessage = async (req, res, next) => {
    const id = req.params.id
    const messageData = req.body
    try {
        const result = await messageSvc.updateMessage(id, messageData)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteMessage = async (req, res, next) => {
    const id = req.params.id
    try {
        const result = await messageSvc.deleteMessage(id)
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}