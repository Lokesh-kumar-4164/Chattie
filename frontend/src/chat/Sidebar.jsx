import { Search, MessageCircle, Settings } from "lucide-react";



export default function Sidebar({contact, setContact, allContacts}) {
  return (
    <div className="w-96 bg-white border-r border-yellow-100 flex flex-col ">

      {/* Header */}

      <div className="p-6 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-gray-800">
          ChatBee 🐝
        </h1>

        <Settings
          className="cursor-pointer text-yellow-500"
          size={22}
        />

      </div>

      {/* Search */}

      <div className="px-5 pb-5">

        <div className="flex items-center bg-[#FFFDF5] rounded-xl px-4 py-3">

          <Search
            size={20}
            className="text-gray-400"
          />

          <input
            placeholder="Search chats..."
            className="bg-transparent outline-none ml-3 flex-1"
          />

        </div>

      </div>

      {/* Chat List */}

      <div className="flex-1 overflow-y-auto px-3">

        {allContacts.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-yellow-50 transition mb-2 
            ${user.id===contact.id? 'bg-red-500':""}`}
            onClick={() => setContact(user)}
          >

            <div className="relative">

              <img
                src={`https://i.pravatar.cc/100?img=${user.id + 15}`}
                className="w-14 h-14 rounded-full"
              />

              {user.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
              )}

            </div>

            <div className="flex-1">

              <h2 className="font-semibold text-gray-800">
                {user.name}
              </h2>

              <p className="text-gray-500 text-sm truncate">
                {user.message}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* Bottom */}

      <div className="p-5 border-t">

        <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-semibold flex justify-center gap-2">

          <MessageCircle />

          New Chat

        </button>

      </div>

    </div>
  );
}