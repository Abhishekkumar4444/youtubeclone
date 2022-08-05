import { createError } from "../errors.js"
import Video from "../model/Video.js"
import User from "../model/User.js"

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body })
  try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (error) {
    next(error)
  }
}

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return next(createError(404, "video not found"))
    if (req.params.id === Video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedVideo)
    } else {
      return next(createError(403, "You can update only you video"))
    }
  } catch (error) {
    next(error)
  }
}
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return next(createError(404, "video not found"))
    if (req.params.id === Video.userId) {
      await Video.findByIdAndDelete(req.params.id)
      res.status(200).json("video deletd")
    } else {
      return next(createError(403, "You can delete only your video"))
    }
  } catch (error) {
    next(error)
  }
}
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)
  } catch (error) {
    next(error)
  }
}

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })
    res.status(200).json("video view has been incremented")
  } catch (error) {
    next(error)
  }
}
export const trends = async (req, res, next) => {
  try {
    // to get most viewed  video means trending video
    const videos = await Video.find().sort({ views: -1 })
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
export const random = async (req, res, next) => {
  try {
    const video = await Video.aggregate([{ $sample: { size: 40 } }])
    res.status(200).json(video)
  } catch (error) {
    next(error)
  }
}

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const subscribedChannels = user.subscribedUsers

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId })
      })
    )

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
  } catch (err) {
    next(err)
  }
}

export const getByTag = async (req, res, next) => {
  // to get  video by tag
  const tags = req.query.tags.split(",")
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
export const search = async (req, res, next) => {
  const query = req.query.q
  try {
    // to get video by serach using regexp in mongodb
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
