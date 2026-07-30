import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './connections/connectDB.js'
import userRouter from "./routes/userRoutes.js"
import http from 'http'
import cookieParser from 'cookie-parser'
dotenv.config();
import { Server } from 'socket.io'
import { initializeSocket } from './socket/socketSetup.js'


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT
const CLIENT = process.env.CLIENT_URL;

app.use(cors({
    origin: CLIENT,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter);

const io = new Server(server, {
  cors: {
    origin: CLIENT,
    credentials: true,
  },
});

initializeSocket(io);

// async function test(){
//     const data = await User.find({});
//     console.log(data);
// }

// test();



connect();
server.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`)
})


