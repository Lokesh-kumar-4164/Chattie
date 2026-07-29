import User from "../models/users.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getConversations,getMessages,sendMessageService } from "../services/conversationService.js"


export const sendMessage = async (req,res) => {
    try{
       const { conversationId, content } = req.body;
       const senderId = req.user.userId;
       const resp = await sendMessageService(conversationId, senderId, content);
       
       return res.status(200).json({isSuccess: true, message: resp});
    }catch(e){
        console.log(`Error at send message controller ${e}`)
        res.status(500).json({isSuccess: false, message: "Server error"})
    }
}



export async function meController(req,res){
    try{
        if(!req.user){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = req.user?.userId;
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        return res.status(200).json({isSuccess: true, userData:user});
    }catch(e){
        
        console.log(`Error at me controller ${e}`)
        return res.status(500).json({isSuccess: false, message: "Server error"})
    }
}

export async function conversations(req,res){
    try{
        
        const userId = req.user.userId;
        const conversations = await getConversations(userId);

        return res.status(200).json({isSuccess: true, conversations});
    }catch(e){
        console.log(`Error at get conversations ${e}`)
        return res.status(500).json({isSuccess: false, message: "Server error"})
    }
}

// export function logoutController(req,res){
//     try{
//         res.clearCookie('token');    
//     }catch(e){
//         console.log(`Error at logout controller ${e}`)
//     }
// }

export async function messages(req,res){
    try{
        const conversationId = req.params.conversationId;
        console.log()
        const msgs = await getMessages(conversationId);
        
        return res.status(200).json({isSuccess: true, messages: msgs});
    }catch(e){
        console.log(`Error at messages controller ${e}`)
        res.status(500).json({isSuccess: false, message: "Server error"})
    }
}

export async function registerController(req,res) {
    try{
        const { fullName, email, password } = req.body;       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }
        

        if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            return res.status(400).json({ message: "Invalid email format." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });

    }catch(e){
        console.log(`Error at register controller ${e}`)
    }
}

export async function loginController(req, res) {
    try {

    
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ isSuccess: false, message: "User not found" })
        }

        const userData = {
            _id : user._id,
            name: user.name,
            email,
            status: user.status,
            isOnline: user.isOnline,
            lastSeen: user.lastSeen
        }

       const token = jwt.sign({ userId : user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

       res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'lax'});
        res.status(200).json({ isSuccess: true, userData })
    } catch (e) {
        console.log("Error at login controller", e);
        res.status(500).json({ isSuccess: false, message: "Internal server error" });
    }
}


export async function logoutController(req, res) {
    try {

        res.clearCookie('token');
        res.status(200).json({ isSuccess: true, message: "User logged out successfully" });
    } catch (e) {
        console.log("Error at logout controller", e);
        res.status(500).json({ isSuccess: false, message: "Internal server error" });
    }
}
