import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useState, useEffect, useRef } from "react";
import { getMessagesAPI } from "../api/chatApi";
import { useAuthStore } from "../store/authStore";
import Error from "../components/Error";

export default function ChatWindow({ handleSend, setIp, contact }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.user);

  const bottomRef = useRef(null);


  // Fetch chat messages when contact changes
  useEffect(() => {
    async function fetchMessages() {
      if (!contact?._id) return;

      try {
        const res = await getMessagesAPI(contact._id);

        if (!res?.messages) return;

        const getSenderId = (msg) => {
          if (!msg.sender) return "";

          return typeof msg.sender === "object"
            ? msg.sender._id?.toString()
            : msg.sender.toString();
        };


        const formattedMessages = res.messages.map((msg) => ({
          _id: msg._id,
          own: getSenderId(msg) === user?._id?.toString(),
          text: msg.content || msg.text || "",
        }));

        setMessages(formattedMessages);

      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages");
      }
    }

    fetchMessages();

  }, [contact, user?._id]);


  // Auto scroll whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "auto",
    });
  }, [messages]);


  function addMessage(text) {
    setMessages((prev) => [
      ...prev,
      {
        _id: Date.now(),
        own: true,
        text,
      },
    ]);
    
    
  }


  if (!contact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FFFDF5]">
        <p className="text-gray-500 text-lg">
          Select a contact to start chatting
        </p>
      </div>
    );
  }


  return (
    <div className="flex-1 flex flex-col h-full">

      <ChatHeader contact={contact} />


      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-5 bg-[#FFFDF5]">

        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            own={msg.own}
            text={msg.text}
          />
        ))}


        {/* Scroll target */}
        <div ref={bottomRef}></div>

      </div>


      {/* Input Area */}
      <MessageInput
        addMessage={addMessage}
        handleSend={handleSend}
        setIp={setIp}
        
      />


      {error && (
        <Error
          message={error}
          onClose={() => setError(null)}
          isOpen={true}
        />
      )}

    </div>
  );
}