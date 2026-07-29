import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './connections/connectDB.js'
import userRouter from "./routes/userRoutes.js"
import cookieParser from 'cookie-parser'
dotenv.config();

import User from './models/users.js'

const app = express();
const PORT = process.env.PORT

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter);

// async function test(){
//     const data = await User.find({});
//     console.log(data);
// }

// test();



connect();
app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`)
})


