import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true
    },
        redirectUrl: {
            type: String,
            required: true
        },
        clicks: {
            type: Number,
            default: 0
        },
        visitHistory: [{ timestamp: { type: Number } }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

UrlSchema.index({ shortId: 1 }, { unique: true });

const URL = mongoose.model("URL", UrlSchema);

export default URL;