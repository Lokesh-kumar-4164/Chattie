import { MessageCircle } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="h-screen bg-[#FFFDF5] flex flex-col justify-center items-center">

      <div className="relative">

        <div className="absolute inset-0 rounded-full bg-yellow-300 animate-ping opacity-30"></div>

        <div className="relative bg-yellow-400 p-6 rounded-full shadow-xl">
          <MessageCircle
            size={50}
            className="text-white animate-bounce"
          />
        </div>

      </div>

      <h1 className="mt-8 text-3xl font-bold text-gray-800">
        ChatBee 🐝
      </h1>

      <p className="text-gray-500 mt-3 animate-pulse">
        Waking up the bees...
      </p>

    </div>
  );
}