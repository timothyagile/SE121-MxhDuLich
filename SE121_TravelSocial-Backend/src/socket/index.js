'use strict'
const EVENTS = require('./events')

const { emitUserListHandler, emitUserConnectedHandler, emitUserDisconnectedHandler } = require('./handlers/user.handler');
const { listenJoinUserRoomHandler, listenJoinConversationRoomHandler } = require('./handlers/room.handler');

const initSocket = (io) => {
    io.on(EVENTS.CONNECTION, (socket) => {
        console.log('Người dùng đã kết nối: ' + socket.id);

        // console.log('UserList::', userList)
        // Gửi danh sách user hiện tại cho client mới kết nối
        //emitUserListHandler(io, socket, userList)
        // Thông báo cho tất cả client khi có người dùng mới kết nối
        
        listenJoinUserRoomHandler(io, socket)
        //listenJoinConversationRoomHandler(io, socket)
        // Xử lý gửi tin nhắn đến một user cụ thể
        // listenPrivateChatHandler(io, socket, connectedUsers)
        // Xử lý gửi tin nhắn đến tất cả
        // listenBroadcastChatHandler(io, socket, connectedUsers)

        // Xử lý khi client ngắt kết nối
        socket.on(EVENTS.DISCONNECT, () => {
            console.log('Client ngắt kết nối:', socket.id);
            // Xóa user khỏi danh sách
            // Thông báo cho tất cả client còn lại
            emitUserDisconnectedHandler(io, socket)
        });
        return {io, socket}
    })
}

module.exports = {
    initSocket
}