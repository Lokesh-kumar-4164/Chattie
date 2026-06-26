import {
  MessageCircle,
  User,
  Mail,
  Lock,
} from "lucide-react";

import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-yellow-400 relative items-center justify-center overflow-hidden">

        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-yellow-300 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-200 opacity-50"></div>

        <div className="relative z-10 text-center px-12">

          <div className="inline-flex p-5 rounded-3xl bg-white/20 backdrop-blur-md mb-8">
            <MessageCircle size={65} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white">
            Join ChatBee
          </h1>

          <p className="text-yellow-100 text-lg mt-6 leading-8">
            Create your account and start chatting
            with friends, family and teammates
            in a fast, secure and beautiful way.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center px-6 py-10">

        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10">

          <div className="text-center">

            <div className="inline-flex bg-yellow-400 p-3 rounded-2xl">
              <MessageCircle className="text-white" size={28} />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-5">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Let's get you started 🚀
            </p>

          </div>

          {/* Name */}

          <div className="mt-8">

            <label className="font-medium text-gray-700">
              Full Name
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-300">

              <User className="text-gray-400" size={20} />

              <input
                type="text"
                placeholder="John Doe"
                className="ml-3 w-full outline-none"
              />

            </div>

          </div>

          {/* Email */}

          <div className="mt-5">

            <label className="font-medium text-gray-700">
              Email
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-300">

              <Mail className="text-gray-400" size={20} />

              <input
                type="email"
                placeholder="example@email.com"
                className="ml-3 w-full outline-none"
              />

            </div>

          </div>

          {/* Phone */}

          

          {/* Password */}

          <div className="mt-5">

            <label className="font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-300">

              <Lock className="text-gray-400" size={20} />

              <input
                type="password"
                placeholder="Create a password"
                className="ml-3 w-full outline-none"
              />

            </div>

          </div>

          {/* Confirm Password */}

          <div className="mt-5">

            <label className="font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-300">

              <Lock className="text-gray-400" size={20} />

              <input
                type="password"
                placeholder="Confirm password"
                className="ml-3 w-full outline-none"
              />

            </div>

          </div>

          {/* Terms */}

          <label className="flex gap-3 mt-6 items-start text-sm text-gray-600">

            <input
              type="checkbox"
              className="accent-yellow-400 mt-1"
            />

            <span>
              I agree to the
              <span className="text-yellow-500 font-semibold cursor-pointer">
                {" "}Terms & Conditions
              </span>
              {" "}and{" "}
              <span className="text-yellow-500 font-semibold cursor-pointer">
                Privacy Policy
              </span>
            </span>

          </label>

          {/* Register Button */}

          <button className="mt-8 w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 transition font-semibold text-gray-800">
            Create Account
          </button>

          {/* Divider */}

          <div className="flex items-center my-6">

            <div className="flex-1 border-t"></div>

            <span className="px-4 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 border-t"></div>

          </div>

          {/* Google */}

          <button className="w-full py-4 border rounded-xl hover:bg-yellow-50 transition font-medium">
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?
            <Link to="/login">
            <span className="text-yellow-500 font-semibold ml-2 cursor-pointer">
              Login
            </span>
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}