import User from "../models/users.js"
import bcrypt from "bcryptjs"


export async function registerController(req,res) {
    try{
        const { fullName, email, password } = req.body;
        console.log("Reached here", req.body);        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
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
        console.log("Reached here");
        return res.status(200).json({isSuccess: true})
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ isSuccess: false, message: "User not found" })
        }

        const userData = {
            name: user.name,
            email,
            status: user.status,
            isOnline: user.isOnline,
            lastSeen: user.lastSeen
        }

        res.status(200).json({ isSuccess: true, data: userData })
    } catch (e) {
        console.log("Error at login controller", e);
        res.status(500).json({ isSuccess: false, message: "Internal server error" });
    }
}


export async function logoutController(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ isSuccess: false, message: "User not found" })
        }



        res.status(200).json({ isSuccess: true, message: "User logged out successfully" });
    } catch (e) {
        console.log("Error at logout controller", e);
        res.status(500).json({ isSuccess: false, message: "Internal server error" });
    }
}
