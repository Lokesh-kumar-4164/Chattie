import express from "express"


import {
    loginController,
    logoutController,
    registerController,
    conversations,
    meController,
    messages,
    sendMessage,
    chats,
    createConversation,
} from "../controllers/userControllers.js"
import verifyToken from "../services/verifyToken.js";
const router = express.Router();

router.post("/login", loginController)

router.post("/register",registerController)
router.post("/me",verifyToken,meController)

router.post("/logout",verifyToken, logoutController)
router.post("/send-message",verifyToken, sendMessage)
router.get("/chats/:email",verifyToken, chats )
router.get("/messages/:conversationId",verifyToken, messages)
router.get("/conversations",verifyToken, conversations)
router.post("/create-conversation",verifyToken, createConversation);


export default router;