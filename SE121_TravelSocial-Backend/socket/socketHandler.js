module.exports = (io) => {

    let onlineUsers = [];

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Lắng nghe sự kiện "chat message"
        socket.on('addNewUser', (userId) => {
            !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({ userId, socketId: socket.id });
            console.log('online user', onlineUsers);

            socket.emit('onlineUsers', onlineUsers);
        });

        // Lắng nghe sự kiện "chat message"
        socket.on('sendMessage', (msg) => {
            const user = onlineUsers.find((user) => user.userId === msg.receiverId);
            if(user) {
                io.to(user.socketId).emit('getMessage', msg);
            }
        });

        // Xử lý khi người dùng ngắt kết nối
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

            socket.emit('onlineUsers', onlineUsers);
        });
    });
};
