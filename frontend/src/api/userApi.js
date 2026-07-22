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