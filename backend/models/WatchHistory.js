import mongoose from "mongoose";

const WatchHistorySchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  video: { type: ObjectId, ref: "Video" },
  watchedAt: Date,
});

const WatchHistory = mongoose.model("WatchHistory", WatchHistorySchema);
export default WatchHistory;
