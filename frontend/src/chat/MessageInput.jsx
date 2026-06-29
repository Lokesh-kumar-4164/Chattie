import { Send, Smile, Paperclip } from "lucide-react";

export default function MessageInput() {
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
        />

        <button className="bg-yellow-400 hover:bg-yellow-500 rounded-xl p-3 transition">

          <Send />

        </button>

      </div>

    </div>
  );
}