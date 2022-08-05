import express from "express"
import { signin, signup, googleAuth } from "../controllers/auth.js"
const router = express.Router()

// !signin a user
router.post("/signin", signin)

//  !Create a user
router.post("/signup", signup)

// !google auth
router.post("/google", googleAuth)

export default router
