import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL;

const socket = io(URL, {
    withCredentials: true,
});

socket.on("connect", () => {
    console.log("✅ Connected:", socket.id);
});

socket.on("connect_error", (err) => {
    console.log("Connection Error:", err.message);
});

export default socket;