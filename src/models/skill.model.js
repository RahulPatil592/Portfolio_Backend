import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        level: {
            type: String,
            required: true,
            enum: ["Basic", "Intermediate", "Advanced"],
            default: "Basic"
        },
        displayImage: {
            type: String,
            required: true
        },
        technology: {
            type: String,
            required: true
        }

    },
    {
        timestamps: true
    })

export const Skill = mongoose.model("Skill", skillSchema)