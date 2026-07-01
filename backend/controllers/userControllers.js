import User from "../models/users.js"

export async function loginController(req, res) {
    try {
        const { email, password } = req.body
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
