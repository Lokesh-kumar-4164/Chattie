import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useState } from 'react'
import { useEffect } from 'react'
import { getMessagesAPI, sendMessageAPI } from "../api/userApi";
import { useAuthStore } from "../store/authStore";
import Error from "../components/Error";



export default function ChatWindow({ contact }) {
  const [messages, setMessages] = useState([]);
  const [ip,setIp] = useState("")
  const [error,setError] = useState(null);
  const user = useAuthStore((state) => state.user);


  useEffect(() => {
    async function fetchMessages(){
      if (!contact?._id) return;
      try {
        console.log("this is contact:", contact);
        const res = await getMessagesAPI(contact._id); 
        console.log("This is at window:", res);
        
        if (!res || !res.messages) return;

        const senderId = (msg) => {
          if (!msg.sender) return "";
          return typeof msg.sender === "object" ? msg.sender._id?.toString() : msg.sender.toString();
        };

        const formatted = res.messages.map((msg) => {
          return {
            _id: msg._id,
            own: senderId(msg) === user?._id?.toString(),
            text: msg.content || msg.text || "",
          };
        });
        setMessages(formatted);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    }

    fetchMessages();
  }, [contact, user?._id]);

  async function handleSend() {
      if (!ip.trim()) return; 
      console.log("Handle send called");
      const res = await sendMessageAPI(contact._id, ip);
      if(res.isSuccess){
        setMessages((prev) => [...prev, {_id:res.message._id, own: true, text: ip }]);
        setIp("");
      }else{
        setError("unable to send message");

      }
    }

    if(error) <Error message={error} onClose={() => setError(null)} isOpen={error?true:false}/>
  if (!contact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FFFDF5]">
        <p className="text-gray-500 text-lg">Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">

      <ChatHeader contact={contact} />

      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-5 bg-[#FFFDF5]">

        {messages && messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            own={msg.own}
            text={msg.text}
          />
        ))}

      </div>

      <MessageInput handleSend={handleSend} setIp={setIp}/>

    </div>
  );
}