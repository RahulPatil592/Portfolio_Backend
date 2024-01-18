import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Testimony } from "../models/testimony.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import client from "../../redis_client.js";

const addTestimony = asyncHandler(async (req, res) => {
    const { name, profession, content } = req.body;
    if (!name || !profession || !content) {
        throw new ApiError(400, "All fields are required")
    }

    const existedTestimony = await Testimony.findOne({ name, profession, content })

    if (existedTestimony) {
        throw new ApiError(409, "Testinmony already present")
    }

    const profileImageLocalPath = req.file?.path;
    let profileImage = "";
    if (profileImageLocalPath) {
        const pimg = await uploadOnCloudinary(profileImageLocalPath);
        if (!pimg) {
            throw new ApiError(400, "Image not uploaded")
        }
        profileImage = profileImage.concat(pimg.url)

    }

    const testimony = await Testimony.create(
        {
            name,
            profession,
            content,
            profileImage: profileImage
        }
    )
    
    client.del("testimonyData")
    return res
        .status(200)
        .json(
            new ApiResponse(200, testimony, "Testimony added successfully")
        )


})


const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimony.find()
    
    const newDataVal=testimonials;
    const dataToStore=JSON.stringify(newDataVal);
    client.set("testimonyData",dataToStore)
    return res
        .status(200)
        .json(
            new ApiResponse(200, testimonials)
        )
})

export {
    addTestimony,
    getTestimonials
}