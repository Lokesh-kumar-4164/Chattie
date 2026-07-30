import mongoose from "mongoose";
import Conversation from "./conversations.js"
import User from "./users.js"


const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Conversation"
    },
    read: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });


const Message =
    mongoose.models.Message ||
    mongoose.model("Message", messageSchema);

export default Message;