import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { useState } from 'react'
import { useEffect } from "react"
import { getConversationsAPI } from "../api/userApi"
import { useAuthStore } from "../store/authStore"

const users = [
  {
    id: 1,
    name: "Naruto",
    message: "Believe it! 🍜",
    online: true,
  },
  {
    id: 2,
    name: "Luffy",
    message: "Let's find One Piece 😂",
    online: true,
  },
  {
    id: 3,
    name: "Zoro",
    message: "I'm lost again...",
    online: false,
  },
  {
    id: 4,
    name: "Gojo",
    message: "You can't touch me 😎",
    online: true,
  },
];

export default function ChatLayout() {
  const [allContacts, setAllContacts] = useState([]);
  const [curContact, setCurContact] = useState(allContacts[0]);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    async function fetchConversations() {
      try {
        const contacts = await getConversationsAPI();
        if (!contacts || !contacts.conversations) return;
        const formatted = contacts.conversations.map((contact) => {
          const otherParticipant = contact.participants?.find(
            (participant) => participant?._id?.toString() !== user?._id?.toString()
          );
          return {
            _id: contact._id,
            name: otherParticipant?.name || "User",
            message: contact.latestMessage?.content || "",
            online: otherParticipant?.isOnline || false,
          };
        });
        setAllContacts(formatted);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
      }
    }
    fetchConversations();
  }, [user?._id]);
 

  
  return (
    <div className="h-screen bg-[#FFFDF5] flex overflow-hidden">

      <Sidebar contact={curContact} setContact={setCurContact} allContacts={allContacts}/>

      <ChatWindow contact={curContact}/>

    </div>
  );
}