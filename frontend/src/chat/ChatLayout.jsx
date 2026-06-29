import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  return (
    <div className="h-screen bg-[#FFFDF5] flex overflow-hidden">

      <Sidebar />

      <ChatWindow />

    </div>
  );
}