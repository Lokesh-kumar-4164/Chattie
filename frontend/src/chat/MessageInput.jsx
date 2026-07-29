import { Send, Smile, Paperclip } from "lucide-react";


export default function MessageInput({ handleSend, setIp }) {
  
  function manageSend() {
    handleSend();
    setIp("");
  }

  
  return (
    <div className="bg-white p-6 border-t">

      <div className="flex items-center gap-4 bg-[#FFFDF5] rounded-2xl px-5 py-3">

        <Smile
          className="text-yellow-500 cursor-pointer"
        />

        <Paperclip
          className="text-yellow-500 cursor-pointer"
        />

        <input
          placeholder="Type something funny... 😂"
          className="flex-1 bg-transparent outline-none"
          onChange={() => setIp(event.target.value)}
          
        />

        <button 
        className="bg-yellow-400 hover:bg-yellow-500 rounded-xl p-3 transition"
        onClick={manageSend}
        >

          <Send  />

        </button>

      </div>

    </div>
  );
}