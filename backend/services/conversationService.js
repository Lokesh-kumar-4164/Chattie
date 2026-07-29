import Conversation from "../models/conversations.js";
import Message from "../models/messages.js";
import mongoose from "mongoose";

export const getConversations = async (userId) => {
  try {

    const conversations = await Conversation.find({
      participants: new mongoose.Types.ObjectId(userId),
    })
      .populate("participants")
      .populate("latestMessage");

    return conversations;
  } catch (e) {
    console.log(`Error at get conversations ${e}`);
    throw e;
  }
};


export const getMessages = async (conversationId) => {
  try {
    const messages = await Message.find({ conversationId });
    return messages
  } catch (e) {
    console.log(`Error at get messages ${e}`);
    throw e;
  }
};


export const sendMessageService = async (conversationId, senderId, content) => {
  try {
    content = content.trim();

    if (!content) {
      throw new Error("Message content cannot be empty");
    }

    const newMessage = await Message.create({
      sender: senderId,
      conversationId,
      content,
    });

    await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { latestMessage: newMessage._id },
      { returnDocument: "after" }
    );

    return newMessage;

  } catch (e) {
    console.log(`Error at send message: ${e.message}`);
    throw e;
  }
};