import mongoose from "mongoose";
import Message from "./messages"
import User from "./users"

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isGroup: { type: Boolean, required: true },
    deletedFor: { type: Array, required: true },
    latestMessage: { type: mongoose.Types.ObjectId, required: true, ref:"Message"},
    groupAdmin: { type: String },
    groupName: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Conversation", conversationSchema);
