'use strict'
const socketService = require('../../socket/handlers/room.handler')

module.exports.joinUserRoom = async (req, res) => {
    const {socketId } = req.body
    const userId = res.locals.user._id
    console.log("Join user room::", req.body)

    const result = await socketService.joinUserRoom(req.io, {socketId, userId})

    res.status(201).json({
        isSuccess: true,
        data: result,
        error: null,
    });
}

module.exports.joinConversationRoom = async (req, res) => {
    const { socketId, conversationId } = req.body
    console.log("Join user room::", req.body)
    
    const result = await socketService.joinConversationRoom(req.io, {socketId, conversationId})

    res.status(201).json({
        isSuccess: true,
        data: result,
        error: null,
    });
}

module.exports.leaveUserRoom = async (req, res) => {
    const {socketId } = req.body
    const userId = res.locals.user._id
    console.log("Join user room::", req.body)

    const result = await socketService.leaveUserRoom(req.io, {socketId, userId})

    res.status(201).json({
        isSuccess: true,
        data: result,
        error: null,
    });
}

module.exports.leaveConversationRoom = async (req, res) => {
    const { socketId, conversationId } = req.body
    console.log("Join user room::", req.body)
    
    const result = await socketService.leaveConversationRomm(req.io, {socketId, conversationId})

    res.status(201).json({
        isSuccess: true,
        data: result,
        error: null,
    });
}