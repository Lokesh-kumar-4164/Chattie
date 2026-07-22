import express from "express"

import {
    loginController,
    logoutController,
    registerController
} from "../controllers/userControllers.js"
const router = express.Router();

router.post("/login", loginController)
router.post("/logout", logoutController)
router.post("/register",registerController)


export default router;