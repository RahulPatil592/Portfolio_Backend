import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true,
        },
        gitLink: {
            type: String,
            trim: true
        },
        webLink: {
            type: String,
            trim: true
        },
        coverImage: {
            type: String, // cloudinary
            required: true
        },
        screenShots: [
            {
                type: String
            }
        ],
        category: {
            type: String,
            required: true
        },
        tags: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Project = mongoose.model("Project", projectSchema);

