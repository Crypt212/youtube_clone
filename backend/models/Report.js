import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    reportedBy: { type: ObjectId, ref: "User" },
    video: { type: ObjectId, ref: "Video" },
    reason: String,
    status: "pending" | "reviewed",
    createdAt: Date,
});

const Report = mongoose.model("Report", ReportSchema);
export default Report;
