import express from "express"

import {
    loginController,
    logoutController
} from "../controllers/userControllers.js"
const router = express.Router();

router.post("/login", loginController)
router.post("/logut", logoutController)


export default router;