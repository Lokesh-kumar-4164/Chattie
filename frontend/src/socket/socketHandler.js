import socket from "./socket"

export const connectSocket =  (userId) => {
    socket.emit("join", userId);
    console.log("Connected at socketHandler")
}