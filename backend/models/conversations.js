import mongoose from "mongoose";


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
    latestMessage: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"Message"},
    groupAdmin: { type: String },
    groupName: { type: String },
  },
  { timestamps: true },
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
