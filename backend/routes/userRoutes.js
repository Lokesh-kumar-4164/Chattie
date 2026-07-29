import express from "express"


import {
    loginController,
    logoutController,
    registerController,
    conversations,
    meController,
    messages,
    sendMessage
} from "../controllers/userControllers.js"
import verifyToken from "../services/verifyToken.js";
const router = express.Router();

router.post("/login", loginController)

router.post("/register",registerController)
router.post("/me",verifyToken,meController)

router.post("/logout",verifyToken, logoutController)
router.post("/send-message",verifyToken, sendMessage)
router.get("/messages/:conversationId",verifyToken, messages)
router.get("/conversations",verifyToken, conversations)


export default router;