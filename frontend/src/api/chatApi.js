import api  from "./setup.js";

export const getChatsAPI = async (email) => {
    try{
        const response = await api.get(`/user/chats/${email}`, {withCredentials: true});
        
        return response.data
    }catch(e){
        console.log(`Error at getChats : ${e.response}`);
        if(e.response.status===401) {
            return { isSuccess: false, message: "Unauthorized", status: 401 };
        }
        throw e;
    }
}


export const sendMessageAPI = async (conversationId, content) => {
    try{
        const response = await api.post(`/user/send-message`, {conversationId, content}, {withCredentials: true});        
        return response.data    
    }    
    catch(e){
        console.log(`Error at sendMessage : ${e.response}`);
        throw e;
    }
}


export const getMessagesAPI = async (conversationId) => {
    try{
        const response = await api.get(`/user/messages/${conversationId}`, {withCredentials: true});
        return response.data
    }    
    catch(e){
        console.log(`Error at getMessages : ${e.response}`);
        throw e;
    }
}

