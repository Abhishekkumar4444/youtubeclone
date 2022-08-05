import User from "../model/User.js"
import Video from "../model/Video.js"

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (err) {
      next(err)
    }
  } else {
    return next(createError(403, "You can update only your account"))
  }
}
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("user has been deleted")
    } catch (error) {
      next(error)
    }
  } else {
    res.send(403).json("You can delete only your data")
  }
}
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    // password shouldnot send to the user
    // const { password, ...other } = user._doc

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    })
    res.status(200).json("user subscribed")
  } catch (error) {
    next(error)
  }
}
export const unSubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    })
    res.status(200).json("user unsubscribed")
  } catch (error) {
    next(error)
  }
}

export const like = async (req, res, next) => {
  const id = req.user.id
  const videoId = req.params.videoId
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislike: id },
    })
    res.status(200).json("someone liked your video")
  } catch (error) {
    next(error)
  }
}
export const disLike = async (req, res, next) => {
  const id = req.user.id
  const videoId = req.params.videoId
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    })
    res.status(200).json("someone disliked your video")
  } catch (error) {
    next(error)
  }
}
