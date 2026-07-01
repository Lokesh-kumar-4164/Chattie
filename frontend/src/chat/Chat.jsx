import React, { useState, useEffect } from 'react';
import { getMessagesApi, sendMessageApi } from "../api/userApi"
import { useAuthStore } from '../store/auth';
import { useCallback } from 'react';

import ErrorPopUp from '../components/ErrorPopUp';
import { useChatStore } from '../store/auth';
import { emitSendMessage } from '../sockets/socketHandler';

const Chat = () => {
  const [error, setError] = useState(null);
  const user = useAuthStore(state => state.user);
  const currentContact = useChatStore(state => state.currentContact);
  const messages = useChatStore(state => state.messages);
  const setMessages = useChatStore(state => state.setMessages);

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  const fetchMessages = useCallback(async (currentContact) => {
    if (!currentContact || !currentContact.id) return;
    try {
      const response = await getMessagesApi(currentContact.id);
      if (response.isSuccess) {
        const msgs = response.messages.map(msg => {
          return {
            id: msg._id,
            text: msg.content,
            type: (msg.sender._id).toString() === user.id.toString() ? "outgoing" : "incoming",
            read: msg.read,
            time: msg.createdAt,
            sender: msg.sender,
          }
        })
        setMessages(msgs)
      } else {
        setError("Error while fetching messages. check you network")
      }
    } catch (e) {
      console.log(`Error while fetching messages : ${e}`);
    }
  }, [user, setMessages])



  useEffect(() => {
    (async () => {
      await fetchMessages(currentContact)
    })()
  }, [currentContact, fetchMessages])

  if (!currentContact) {
    return (
      <div>
        <p>Add a conversation to start</p>
      </div>
    )
  }

  const handleSend = async (e) => {
    e.preventDefault();
    const message = document.getElementById("message");
    const text = message.value;
    const senderId = user.id;
    const receiverId = currentContact.receiverId;
    const convoId = currentContact.id

    try {
      const response = await sendMessageApi(currentContact.id, text);
      if (response.isSuccess) {
        console.log(response.message);
        const currentMessage = response.message;
        emitSendMessage({ ...currentMessage, receiverId, })

        message.value = "";

      } else {
        setError("Error while sending message. check your network")
      }
    } catch (e) {
      console.log(`Error while sending message : ${e}`);
    }

    fetchMessages(currentContact)
  }


  if (!currentContact) {
    return (
      <div className="h-screen bg-[#0F172A] flex text-slate-100 col-span-1">
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">No Contact Selected</h3>
              <p className="text-sm text-slate-400">
                Select a contact to start chatting
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="h-screen bg-[#0F172A] flex text-slate-100 col-span-1">


      {/* Chat Area */}
      <main className="flex-1 flex flex-col">


        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{currentContact.name}</h3>
            <p className="text-sm text-slate-400">
              {currentContact.active ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

          {messages.length === 0 && <p> No messages found</p>}

          {messages.map((msg) => {

            if (msg.type === "incoming") {
              return (
                <div key={msg.id} className="flex flex-col items-start">
                  <div className="bg-[#1E293B] px-4 py-2 rounded-2xl rounded-bl-none max-w-xs">
                    {msg.text}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 ml-1">
                    {formatTime(msg.time)}
                  </span>
                </div>
              );
            }

            if (msg.type === "outgoing") {
              return (
                <div key={msg.id} className="flex flex-col items-end">
                  <div className="bg-indigo-500 px-4 py-2 rounded-2xl rounded-br-none max-w-xs text-white shadow-md shadow-indigo-500/20">
                    {msg.text}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 mr-1">
                    {formatTime(msg.time)}
                  </span>
                </div>
              );
            }

            if (msg.type === "typing") {
              return (
                <div key={msg.id} className="flex">
                  <div className="bg-[#1E293B] px-4 py-3 rounded-2xl rounded-bl-none flex space-x-2 items-center">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              );
            }

            return null;
          })}

        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-slate-800">
          <div className="flex items-center bg-[#1E293B] rounded-xl px-4 py-3">
            <input
              id="message"
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-500"
            />
            <button
              className="ml-4 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 transition text-white"
              onClick={handleSend}
              onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
            >
              Send
            </button>
          </div>
        </div>

      </main>

      {error && <ErrorPopUp message={error} />}
    </div>
  );
};

export default Chat;