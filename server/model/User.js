import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },

    // no of user ki  id jisne mujhe subscribe kiya hai
    subscribers: {
      type: Number,
      default: 0,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },

    // list of user  ki id  jisko maine subscribe kiya hai
    subscribedUsers: {
      type: [String],
    },
  },
  { timestamps: true }
)

export default mongoose.model("User", UserSchema)
