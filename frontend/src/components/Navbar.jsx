
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 lg:px-20 py-6 bg-white shadow-sm">

        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 p-2 rounded-xl">
            <MessageCircle className="text-white w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Chat<span className="text-yellow-400">Bee</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-10 text-gray-700 font-medium">
          <a href="#" className="hover:text-yellow-500 transition">
            Home
          </a>

          <a href="#" className="hover:text-yellow-500 transition">
            Features
          </a>

          <a href="#" className="hover:text-yellow-500 transition">
            Pricing
          </a>

          <a href="#" className="hover:text-yellow-500 transition">
            Contact
          </a>
        </div>

        <div className="flex gap-4">
        <Link to="/login">
          <button className="px-5 py-2 rounded-xl border-2 border-yellow-400 hover:bg-yellow-100 transition">
            Login
          </button>
          </Link>

        <Link to="/register">
          <button className="px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 transition font-semibold">
            Sign Up
          </button>
          </Link>

        </div>

      </nav>
    )
}

export default Navbar