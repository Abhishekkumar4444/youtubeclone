import Video from "../model/Video.js"
import Comment from "../model/Comments.js"
export const addComment = async (req, res, next) => {
  const comment = new Comment({ userId: req.user.id, ...req.body })
  try {
    const savedComment = await comment.save()
    res.status(200).send(savedComment)
  } catch (error) {
    next(error)
  }
}
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id)
    const video = await Video.findById(res.params.id)
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(res.params.id)
      res.status(200).json("comment has been deleted")
    } else {
      res.status(404).json("you can  delete  only your comment")
    }
  } catch (error) {
    next(error)
  }
}
export const getComments = async (req, res, next) => {
  try {
    const getAllComments = await Comment.find({ videoId: req.params.videoId })
    res.status(200).json(getAllComments)
  } catch (error) {
    next(error)
  }
}
