export const getConversations = async (userId) => {
  try {
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants")
      .populate("latestMessage");
    return conversations;
  } catch (e) {
    console.log(`Error at get conversations ${e}`);
    throw e;
  }
};



