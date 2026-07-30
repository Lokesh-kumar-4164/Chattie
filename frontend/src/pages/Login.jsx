import { MessageCircle, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom"
import { useState } from "react"
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import Error from "../components/Error";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login);
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate("/chat");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  

  if(loading) return <Loading/>
  if(error) return <Error isOpen={error?true:false} onClose={() => setError(null)} message={error}/>
  return (
    <div className="min-h-screen bg-[#FFFDF5] flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-yellow-400 items-center justify-center relative overflow-hidden">

        <div className="absolute w-96 h-96 bg-yellow-300 rounded-full -top-24 -left-24 opacity-50"></div>
        <div className="absolute w-72 h-72 bg-yellow-200 rounded-full bottom-0 right-0 opacity-50"></div>

        <div className="relative z-10 text-center text-white px-10">

          <div className="inline-flex p-5 bg-white/20 rounded-3xl backdrop-blur-md mb-8">
            <MessageCircle size={60} />
          </div>

          <h1 className="text-5xl font-bold mb-5">
            Welcome Back!
          </h1>

          <p className="text-xl leading-9 text-yellow-100">
            Continue your conversations with friends,
            teammates and family—all in one place.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

          <div className="text-center">

            <div className="inline-flex bg-yellow-400 p-3 rounded-2xl mb-5">
              <MessageCircle className="text-white" size={28} />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Login
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to your account
            </p>

          </div>

          {/* Email */}

          <div className="mt-8">

            <label className="text-gray-700 font-medium">
              Email
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-300">

              <Mail size={20} className="text-gray-400" />

              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your email"
                className="ml-3 w-full outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mt-5">

            <label className="text-gray-700 font-medium">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-yellow-300">

              <Lock size={20} className="text-gray-400" />

              <input
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Enter your password"
                className="ml-3 w-full outline-none"
              />

            </div>

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center mt-5">


          </div>

          {/* Login */}

          <button onClick={handleLogin} className="mt-8 w-full bg-yellow-400 hover:bg-yellow-500 transition py-4 rounded-xl font-semibold text-gray-800">
            Login
          </button>

          <div className="my-6 flex items-center">

            <div className="flex-1 border-t"></div>

            <span className="px-4 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 border-t"></div>

          </div>

          

          <p className="text-center text-gray-500 mt-8">
            Don't have an account?
            <Link to="/register">
            <span className="text-yellow-500 font-semibold cursor-pointer ml-2">
              Sign Up
            </span>
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}