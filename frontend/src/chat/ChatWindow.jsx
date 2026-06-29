import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const messages = [
  {
    own: false,
    text: "Hey annaya 👋",
  },
  {
    own: true,
    text: "Hello 😂",
  },
  {
    own: false,
    text: "Ready to build ChatBee?",
  },
  {
    own: true,
    text: "Always 💪",
  },
];

export default function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col">

      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-5 bg-[#FFFDF5]">

        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            own={msg.own}
            text={msg.text}
          />
        ))}

      </div>

      <MessageInput />

    </div>
  );
}