import { Send, Smile, Paperclip } from "lucide-react";
import { useState } from "react"; 

export default function MessageInput({ addMessage, handleSend, setIp }) {
  const [input,setInput] = useState("")
  function manageSend() {
    addMessage(input)
    handleSend();
    setIp('');
    setInput("");
  }

  function handleChange(event){
    setIp(event.target.value);
    setInput(event.target.value);
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
          onChange={handleChange}
          value={input}
          
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