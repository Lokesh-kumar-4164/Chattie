import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {isAuthenticated, isLoading} = useAuthStore()

    if(isLoading) return <Loading/>

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    return children;

}

export default ProtectedRoute;