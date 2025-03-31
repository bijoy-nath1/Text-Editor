import mongoose from "mongoose";

const draftSchema = new mongoose.Schema(
    {
        title: { type: String, require: false },
        text: { type: String, required: false },
    },
    { timestamps: true },
);

const Draft = mongoose.model("Draft", draftSchema);

export default Draft;
