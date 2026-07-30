import { listener, onlineUsers, getOnlineUsers } from "./socketHandler.js"
let ioInstance;
export function initializeSocket(io) {
    ioInstance = io;

  io.on("connection", (socket) => {

    console.log("New socket connected:", socket.id);
    listener(socket,io);

    socket.on("disconnect", () => {
      if(socket.userId){
        onlineUsers.delete(socket.userId);
      }

      io.emit("online-users", getOnlineUsers());

      console.log("Socket disconnected:", socket.id);
    });

  });

}

export function getIo() {
    if (!ioInstance) {
        throw new Error("Socket.IO has not been initialized.");
    }
    return ioInstance
}