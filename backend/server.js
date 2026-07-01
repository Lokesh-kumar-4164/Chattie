import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './connections/connectDB.js'
import userRouter from "./routes/userRoutes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());
app.use("/user",userRouter);

app.get("/", (req,res) => {
    res.send("hi")
})

connect();
app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`)
})


