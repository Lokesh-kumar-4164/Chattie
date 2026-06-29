import {  ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar"

 const  Home = () => {
  return (
    <div className="min-h-screen bg-[#FFFDF5]">

      
      <Navbar/>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 lg:px-20 py-20 grid lg:grid-cols-2 items-center gap-20">

        {/* Left */}

        <div>

          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
            ✨ Simple. Fast. Secure.
          </span>

          <h1 className="text-6xl font-extrabold text-gray-800 leading-tight mt-8">
            Chat
            <span className="text-yellow-400"> Smarter </span>
            With Everyone.
          </h1>

          <p className="text-gray-600 mt-8 text-lg leading-8">
            Experience lightning-fast messaging with beautiful design,
            end-to-end security and effortless collaboration.
          </p>

          <div className="flex gap-5 mt-10">
            <Link to="/chat">
            <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-7 py-4 rounded-2xl font-semibold transition">

              Get Started

              <ArrowRight size={20} />

            </button>
            </Link>

            <button className="border-2 border-yellow-400 px-7 py-4 rounded-2xl hover:bg-yellow-100 transition">

              Learn More

            </button>

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <div className="bg-white shadow-2xl rounded-[35px] p-8 w-[420px]">

            <div className="space-y-5">

              <div className="bg-yellow-100 rounded-2xl p-4 w-fit max-w-[80%]">
                👋 Hey! Ready to chat?
              </div>

              <div className="bg-yellow-400 rounded-2xl p-4 ml-auto w-fit max-w-[80%]">
                Absolutely 🚀
              </div>

              <div className="bg-yellow-100 rounded-2xl p-4 w-fit max-w-[80%]">
                Let's build something awesome!
              </div>

            </div>

            <div className="mt-8 flex gap-3">

              <input
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-300"
              />

              <button className="bg-yellow-400 hover:bg-yellow-500 px-5 rounded-xl transition">
                ➤
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;