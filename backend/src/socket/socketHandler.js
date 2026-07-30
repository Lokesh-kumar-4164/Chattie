const onlineUsers = new Map();

export const listener = (socket) => {
    socket.on("join", (userId) => {
        onlineUsers.set(userId, socket.id)
        console.log(`User ${userId} joined with socket ${socket.id}`);
    })
}