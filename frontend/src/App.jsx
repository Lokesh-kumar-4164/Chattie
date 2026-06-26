import { Routes, Route } from "react-router-dom"
import Loading from "./components/Loading"

import { lazy, Suspense } from "react"

const Login = lazy(() => import("./pages/Login"))
const Home = lazy(() => import("./pages/Home"))
const Register = lazy(() => import("./pages/Register.jsx"))

const App = () => {
  return (
    <Suspense fallback={<Loading/>}>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      
    </Routes>
    </Suspense>
  )
};

export default App;
