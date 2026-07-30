import socket from "./socket"

export const connectSocket =  (userId) => {
    if(socket.connected){
        socket.emit("join", userId);
    }else {
        socket.on("connect", () => {
            socket.emit("join", userId);
        });
    
    }
    
}