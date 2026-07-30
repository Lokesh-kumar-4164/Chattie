import { Routes, Route, Navigate } from "react-router-dom"
import Loading from "./components/Loading"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"

import { lazy, Suspense } from "react"
import ProtectedRoute from "./routes/protectedRoute.jsx"

const Login = lazy(() => import("./pages/Login"))
const Home = lazy(() => import("./pages/Home"))
const Register = lazy(() => import("./pages/Register.jsx"))
const ChatPage = lazy(() => import("./chat/ChatLayout.jsx"))
const AddChat = lazy(() => import("./pages/AddChat.jsx"))


const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    checkAuth();
  },[checkAuth])

  if (isLoading) return <Loading />

  return (
    <Suspense fallback={<Loading/>}>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/chat" /> : <Login/>}/>
      <Route path="/register" element={isAuthenticated ? <Navigate to="/chat" /> : <Register/>}/>
      <Route  path="/chat" element={
        <ProtectedRoute>
          <ChatPage/>
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
