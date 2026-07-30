import mongoose from "mongoose";
import User from "./users.js"

const conversationSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    conversationId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Conversation"},
    read: {type:Boolean, default: false},
    content: { type: String, required: true },
    
},  {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;