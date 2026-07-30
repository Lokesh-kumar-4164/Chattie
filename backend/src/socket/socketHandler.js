export const onlineUsers = new Map();

export const listener = (socket,io) => {
    socket.on("join", (userId) => {
        socket.userId = userId;
        onlineUsers.set(userId, socket.id)
        console.log(getOnlineUsers()); 
        io.emit("online-users", getOnlineUsers());
        
    })

    
}


export function getSocketId(userId){
    return onlineUsers.get(userId)
}

export function getOnlineUsers(){
    return Array.from(onlineUsers.keys());
}