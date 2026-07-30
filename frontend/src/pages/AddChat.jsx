import { useState } from "react";
import { getChatsAPI } from "../api/chatApi";
import { createConversationAPI } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const AddChat = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const searchUser = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);

      const res = await getChatsAPI(email);
      
      if (res.isSuccess) {
        setUser(res.user);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleStartChat() {
    const res = await createConversationAPI(user._id);

    if(res.status === 401){
      return navigate("/login");
    }
    if(res.isSuccess){
      const otherParticipant = res.conversation.participants?.find((participant) => participant?._id?.toString() !== user?._id?.toString());
      const formatted = {
            _id: res.conversation._id,
            name: otherParticipant?.name || "User",
            message: res.conversation.latestMessage?.content || "",
            online: otherParticipant?.isOnline || false,
          };
      navigate("/chat", { state: { contact:formatted}})
    }
    
  }

  return (
    <div className="min-h-screen bg-[#FFF7D6] flex flex-col">
      {/* Header */}
      <div
        className="
        h-20
        bg-[#FFD43B]
        flex
        items-center
        px-10
        shadow-sm
      "
      >
        <div className="flex items-center gap-3">
          <div
            className="
            w-12
            h-12
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            text-3xl
          "
          >
            🐝
          </div>

          <h1
            className="
            text-3xl
            font-bold
            text-gray-800
          "
          >
            ChatBee
          </h1>
        </div>
      </div>

      {/* Main */}
      <div
        className="
        flex-1
        flex
        justify-center
        px-6
        py-12
      "
      >
        <div
          className="
          w-full
          max-w-3xl
        "
        >
          <h2
            className="
            text-4xl
            font-bold
            text-gray-800
            mb-3
          "
          >
            Find someone to chat with 💬
          </h2>

          <p
            className="
            text-gray-600
            mb-8
            text-lg
          "
          >
            Search users by their email and start a conversation.
          </p>

          {/* Search Area */}

          <div
            className="
            bg-white
            rounded-3xl
            p-3
            shadow-md
            flex
            gap-3
            border
            border-yellow-200
          "
          >
            <input
              type="email"
              placeholder="Search by email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                flex-1
                px-5
                py-4
                text-lg
                rounded-2xl
                outline-none
                bg-gray-50
                focus:bg-white
              "
            />

            <button
              onClick={searchUser}
              className="
                px-8
                rounded-2xl
                bg-[#FFC107]
                font-semibold
                text-gray-900
                hover:bg-[#FFB300]
                transition
              "
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Results */}

          <div className="mt-10">
            {user && (
              <div
                className="
                bg-white
                rounded-3xl
                p-6
                shadow-md
                flex
                items-center
                justify-between
                border
                border-yellow-100
              "
              >
                <div
                  className="
                  flex
                  items-center
                  gap-5
                "
                >
                  <div
                    className="
                    w-16
                    h-16
                    rounded-full
                    bg-[#FFD43B]
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                  "
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3
                      className="
                      text-xl
                      font-bold
                      text-gray-800
                    "
                    >
                      {user.name}
                    </h3>

                    <p
                      className="
                      text-gray-500
                    "
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStartChat}
                  className="
                    bg-[#FFD43B]
                    px-7
                    py-3
                    rounded-2xl
                    font-semibold
                    hover:bg-yellow-400
                    transition
                  "
                >
                  Start Chat
                </button>
              </div>
            )}

            {/* {!user && email && !loading && (
              <div
                className="
                text-center
                mt-10
                text-gray-500
                text-lg
              "
              >
                No user found 🥲
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChat;
