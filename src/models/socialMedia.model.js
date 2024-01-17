import mongoose, { Schema } from "mongoose";

const socialMediaSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        }


    },
    {
        timestamps: true
    }
)

export const SocialMedia = new mongoose.model("SocialMedia", socialMediaSchema);