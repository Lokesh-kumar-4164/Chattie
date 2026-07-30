import Conversation from "../models/conversations.js";
import Message from "../models/messages.js";
import mongoose from "mongoose";

export const getConversations = async (userId) => {
  try {
    const conversations = await Conversation.find({
      participants: new mongoose.Types.ObjectId(userId),
    })
      .populate("participants")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    return conversations;
  } catch (e) {
    console.log(`Error at get conversations ${e}`);
    throw e;
  }
};

export const getMessages = async (conversationId) => {
  try {
    const messages = await Message.find({ conversationId });
    return messages;
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

    const conversation = await Conversation.findOneAndUpdate(
      { _id: conversationId },
      { latestMessage: newMessage._id },
      { returnDocument: "after" },
    );

    const receiverId = conversation.participants.find(
      (participant) => participant.toString() !== senderId.toString(),
    );

    return { newMessage,receiverId };
  } catch (e) {
    console.log(`Error at send message: ${e.message}`);
    throw e;
  }
};

export const createConversationService = async (userId, participantId) => {
  try {
    if (userId === participantId) return null;
    const existingConversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    }).populate("participants");

    if (existingConversation) {
      return existingConversation;
    }

    const conversation = await Conversation.create({
      participants: [userId, participantId],
    }).populate("participants");
    return conversation;
  } catch (e) {
    console.log(`Error at create conversation: ${e.message}`);
    throw e;
  }
};
