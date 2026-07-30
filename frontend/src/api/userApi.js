import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

// console.log("This is " + import.meta.env.VITE_BACKEND_URL)

export const registerAPI = async (data) => {
    try{
        const response = await api.post("/user/register", data);
        return response.data
    }catch(e){
        console.log(`Error at registerAPI : ${e.response.status}`);
        throw e;
    }
} 

export const loginAPI = async (data) => {
    try{
        const response = await api.post("/user/login", data, {withCredentials: true});
        return response.data
    }catch(e){
        console.log(`Error at loginAPI : ${e.response}`);
        throw e;
    }

}


export const logoutAPI = async () => {
    try{
        const response = await api.post("/user/logout", {}, {withCredentials: true});
        return response.data
    }catch(e){
        console.log(`Error at logoutAPI : ${e.response}`);
        return { isSuccess: false, message: "Logout failed" }
    }
}


export const checkAuth = async () => {
    try{
        const response = await api.get("/user/me", {withCredentials: true});
        return response.data
    }catch(e){
        console.log(`Error at checkAuth : ${e.response}`);
        throw e;
    }
}