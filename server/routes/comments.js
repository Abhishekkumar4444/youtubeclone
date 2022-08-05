import express from "express"
import { addComment, deleteComment } from "../controllers/comment.js"
import { verifyToken } from "./../verifyToken.js"
import { getComments } from "./../controllers/comment.js"
const router = express.Router()
router.post("/", verifyToken, addComment)
router.get("/:videoId", verifyToken, getComments)
router.delete("/:id", verifyToken, deleteComment)
export default router
