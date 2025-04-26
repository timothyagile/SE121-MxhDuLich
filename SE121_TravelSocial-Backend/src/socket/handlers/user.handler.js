'use strict'

const EVENTS = require("../events");


const emitUserConnectedHandler = (io, socket) => {
    socket.emit(EVENTS.USER.USER_CONNECTED, {
        socketId: socket.id,
        message: `Client ${socket.id} connected successfully`,
    });
    console.log('emit success');
}

const emitUserListHandler = (io, socket) => {
    console.log('emitUserListHandler::', userList)
    socket.emit(EVENTS.USER.USERLIST, userList);
}

const emitUserDisconnectedHandler = (io, socket) => {
    io.emit('user disconnected', {
        id: socket.id,
        message: `Client ${socket.id} đã ngắt kết nối`,
    });
}

module.exports = {
    emitUserConnectedHandler,
    emitUserListHandler,
    emitUserDisconnectedHandler
}