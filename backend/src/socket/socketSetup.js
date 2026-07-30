import { listener, onlineUsers } from "./socketHandler.js"
export function initializeSocket(io) {

  io.on("connection", (socket) => {

    console.log("New socket connected:", socket.id);
    listener(socket);

    socket.on("disconnect", () => {
      if(socket.userId){
        onlineUsers.delete(socket.userId);
      }

      console.log("Socket disconnected:", socket.id);
    });

  });

}