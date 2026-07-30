import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { useState } from 'react'

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
  const [allContacts, setAllContacts] = useState(users);
  const [curContact, setCurContact] = useState(allContacts[0]);
  return (
    <div className="h-screen bg-[#FFFDF5] flex overflow-hidden">

      <Sidebar contact={curContact} setContact={setCurContact} allContacts={allContacts}/>

      <ChatWindow contact={curContact}/>

    </div>
  );
}