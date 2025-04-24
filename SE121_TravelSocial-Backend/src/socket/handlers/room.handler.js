'use strict'

const { NotFoundException } = require("../../errors/exception");
const EVENTS = require("../events");

const listenJoinConversationRoomHandler = async (io) => {
    io.on(EVENTS.ROOM.JOIN_CONVERSATION, (socket, data) => {
        const { conversationId } = data
        socket.join(roomId)
        io.on(EVENTS.ROOM.LEAVE_CONVERSATION, () => {
            console.log('Leave conv-room::'  + socket.id)
        })
    })
}   

const listenJoinUserRoomHandler = async (io) => {
    io.on(EVENTS.ROOM.JOIN_USER, (socket) => {


        io.on(EVENTS.ROOM.LEAVE_USER, () => {
            console.log('Leave conv-room::'  + socket.id)
        })
    })
}

const joinUserRoom = (io, data) => {
    const { socketId, userId } = data
    const socket = io.sockets.sockets.get(socketId);

    if (!socket) {
        throw new NotFoundException() 
    }

    const roomId = `user_${userId}`;
    socket.join(roomId);
    return roomId
}

const leaveUserRoom = (io, data) => {
    const { socketId, userId } = data
    const socket = io.sockets.sockets.get(socketId);

    if (!socket) {
        throw new NotFoundException() 
    }

    const roomId = `user_${userId}`;
    socket.leave(roomId);
    return "leave room success"
}

const joinConversationRoom = (io, data) => {
    const { socketId, conversationId } = data
    const socket = io.sockets.sockets.get(socketId);

    if (!socket) {
        throw new NotFoundException() 
    }

    const roomId = `conv_${conversationId}`;
    socket.join(roomId);
    return roomId
}

const leaveConversationRomm = (io, data) => {
    const { socketId, conversationId } = data
    const socket = io.sockets.sockets.get(socketId);

    if (!socket) {
        throw new NotFoundException() 
    }

    const roomId = `conv_${conversationId}`;
    socket.leave(roomId);
    return roomId
}

module.exports = {
    joinUserRoom,
    leaveUserRoom,
    joinConversationRoom,
    leaveConversationRomm
}