import express from "express"


import {
    loginController,
    logoutController,
    registerController,
    conversations,
    meController,
} from "../controllers/userControllers.js"
import verifyToken from "../services/verifyToken.js";
const router = express.Router();

router.post("/login", loginController)

router.post("/register",registerController)
router.post("/me",meController)

router.post("/logout",verifyToken, logoutController)
router.get("/conversations",verifyToken, conversations)


export default router;