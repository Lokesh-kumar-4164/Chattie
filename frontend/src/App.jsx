import { Routes, Route, Navigate } from "react-router-dom"
import Loading from "./components/Loading"
import { useAuthStore } from "./store/authStore"
import { useEffect,useState } from "react"
import { connectSocket } from "./socket/socketHandler.js"
import { lazy, Suspense } from "react"
import ProtectedRoute from "./routes/ProtectedRoute.jsx"
import socket from "./socket/socket"

const Login = lazy(() => import("./pages/Login"))
const Home = lazy(() => import("./pages/Home"))
const Register = lazy(() => import("./pages/Register.jsx"))
const ChatPage = lazy(() => import("./chat/ChatLayout.jsx"))
const AddChat = lazy(() => import("./pages/AddChat.jsx"))




const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    checkAuth();

    if(user?._id){
      connectSocket(user._id)

    }

  },[checkAuth,user?._id])

  useEffect(() => {
      const handleOnlineUsers = (users) => {
        setOnlineUsers(users);
        console.log("ONLINE USERS EVENT", users);
      
      }
  
      socket.on("online-users", handleOnlineUsers);
  
      return () => {
        socket.off("online-users", handleOnlineUsers)
      }
    },[])
  

  if (isLoading) return <Loading />

  return (
    <Suspense fallback={<Loading/>}>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/chat" /> : <Login/>}/>
      <Route path="/register" element={isAuthenticated ? <Navigate to="/chat" /> : <Register/>}/>
      <Route  path="/chat" element={
        <ProtectedRoute>
          <ChatPage onlineUsers={onlineUsers}/>
        </ProtectedRoute>
          
      }/>
      <Route path="/add-chat" element={
        <ProtectedRoute>
          <AddChat/>
        </ProtectedRoute>
      }/>
      
    </Routes>
    </Suspense>
  )
};

export default App;
