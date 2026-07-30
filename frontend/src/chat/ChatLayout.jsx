import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { useState } from "react";
import { useEffect } from "react";
import { getConversationsAPI } from "../api/userApi";
import { useAuthStore } from "../store/authStore";
import { useLocation } from "react-router-dom";
import Error from "../components/Error";
import { sendMessageAPI } from "../api/chatApi";
import { pushToFront } from "../services/helperFunctions.js";

export default function ChatLayout() {
  const [allContacts, setAllContacts] = useState([]);
  const [curContact, setCurContact] = useState(null);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const [ip, setIp] = useState("");
  const [error, setError] = useState(null);

  const receivedContact = location.state?.contact;

  useEffect(() => {
    async function fetchConversations() {
      try {
        const contacts = await getConversationsAPI();
        if (!contacts || !contacts.conversations) return;
        const formatted = contacts.conversations.map((contact) => {
          const otherParticipant = contact.participants?.find(
            (participant) =>
              participant?._id?.toString() !== user?._id?.toString(),
          );
          return {
            _id: contact._id,
            name: otherParticipant?.name || "User",
            message: contact.latestMessage?.content || "",
            online: otherParticipant?.isOnline || false,
          };
        });
        setAllContacts(formatted);
        setCurContact(receivedContact || formatted[0]);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
      }
    }
    fetchConversations();
  }, [user?._id, receivedContact]);

  async function handleSend() {
    if (!ip.trim()) return;
    const res = await sendMessageAPI(curContact._id, ip);
    if (res.isSuccess) {
      const newContacts = pushToFront(allContacts, curContact._id, ip);
      setAllContacts(newContacts);
      setIp("");
    } else {
      setError("unable to send message");
    }
  }

  if (error) {
    return (
      <Error
        message={error}
        onClose={() => setError(null)}
        isOpen={error ? true : false}
      />
    );
  }

  return (
    <div className="h-screen bg-[#FFFDF5] flex overflow-hidden">
      <Sidebar
        contact={curContact}
        setContact={setCurContact}
        allContacts={allContacts}
      />

      <ChatWindow 
        handleSend={handleSend} 
        setIp={setIp} 
        contact={curContact} 
       
      />
    </div>
  );
}
