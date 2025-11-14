import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({

  _id: ObjectId,
  title: String,
  description: String,
  url: String,
  thumbnail: String,
  uploader: { type: ObjectId, ref: "User" },
  likes: [{ type: ObjectId, ref: "User" }],
  views: Number,
  comments: [{ type: ObjectId, ref: "Comment" }],
  isLive: Boolean,    // false for normal uploads, true for live streams
  createdAt: Date,
  updatedAt: Date,
});

const Video = mongoose.model("Video", VideoSchema);
export default Video;
