import { Phone, Video, MoreVertical } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="bg-white h-24 px-10 flex justify-between items-center border-b">

      <div className="flex items-center gap-4">

        <img
          src="https://i.pravatar.cc/100?img=20"
          className="w-14 h-14 rounded-full"
        />

        <div>

          <h2 className="font-bold text-xl">
            Naruto
          </h2>

          <p className="text-green-500">
            Online
          </p>

        </div>

      </div>

      <div className="flex gap-6">

        <Phone className="cursor-pointer text-yellow-500"/>

        <Video className="cursor-pointer text-yellow-500"/>

        <MoreVertical className="cursor-pointer text-yellow-500"/>

      </div>

    </div>
  );
}