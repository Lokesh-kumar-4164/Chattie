import { listener } from "./socketHandler.js"
export function initializeSocket(io) {

  io.on("connection", (socket) => {

    console.log("New socket connected:", socket.id);
    listener(socket);

    socket.on("disconnect", () => {
      for(const [userId, socketId] of onlineUsers){
        if(socketId===socket.id){
            onlineUsers.delete(userId);
            break;
        }
      }

      console.log("Socket disconnected:", socket.id);
    });

  });

}