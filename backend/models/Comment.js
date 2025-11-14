import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    _id: ObjectId,
    video: { type: ObjectId, ref: "Video" },
    commenter: { type: ObjectId, ref: "User" },
    text: String,
    likes: [{ type: ObjectId, ref: "User" }],
    replies: [{ type: ObjectId, ref: "Comment" }],
    createdAt: Date,
});

CommentSchema.pre("save", function(next) {
    this.createdAt = Date.now();
    next();
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
