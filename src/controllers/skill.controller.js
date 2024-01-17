import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Skill } from "../models/skill.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addSkill = asyncHandler(async (req, res) => {
    const { name, level, technology } = req.body;
    if (!name || !level || !technology) {
        throw new ApiError(400, "All fields are required")
    }

    const existedSkill = await Skill.findOne({ name })
    if (existedSkill) {
        throw new ApiError(409, "Skill already added")
    }

    const displayImageLocalPath = req.file?.path;
    if (!displayImageLocalPath) {
        throw new ApiError(400, "Display image is required")
    }

    const displaImage = await uploadOnCloudinary(displayImageLocalPath);

    if (!displaImage) {
        throw new ApiError(400, "Image not uploaded")
    }
    const skill = await Skill.create(
        {
            name,
            level,
            displayImage: displaImage.url,
            technology
        }
    )

    client.del("skillData")
    return res
        .status(200)
        .json(
            new ApiResponse(200, skill, "Skill addes successfully")
        )
})

const getSkills = asyncHandler(async (req, res) => {
    const skills = await Skill.find();
    const toSend = await Skill.aggregate(
        [
            {
                $group: {
                    _id: "$technology",
                    subSkills: { $push: "$$ROOT" }
                }
            }
        ]
    )


    const newDataVal=skills;
    const dataToStore=JSON.stringify(newDataVal);
    client.set("skillData",dataToStore)
    return res
        .status(200)
        .json(
            new ApiResponse(200, toSend)
        )
})

export {
    addSkill,
    getSkills
}