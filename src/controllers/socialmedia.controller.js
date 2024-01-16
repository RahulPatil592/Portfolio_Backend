import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SocialMedia } from "../models/socialMedia.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addSocialMedia = asyncHandler(async (req, res) => {
    const { name, link } = req.body;
    if (!name || !link) {
        throw new ApiError(400, "All fileds are required")
    }

    const existedMedia = await SocialMedia.findOne({ name });

    if (existedMedia) {
        throw new ApiError(409, "Media already exists")
    }

    const mediaImageLocalPath = req.file?.path;
    const mediaImage = await uploadOnCloudinary(mediaImageLocalPath)
    if (!mediaImage) {
        throw new ApiError(400, "Image not uploaded")
    }

    const socialMedia = await SocialMedia.create(
        {
            name,
            link,
            img: mediaImage.url
        }

    )

    return res.
        status(200)
        .json(
            new ApiResponse(200, socialMedia, "Social Media added successfully")
        )
})


const getSocialMedia=asyncHandler(async(req,res)=>{
    const socialMedia=await SocialMedia.find();
    return res
    .status(200)
    .json(
        new ApiResponse(200,socialMedia)
    )
})


export{
    addSocialMedia,
    getSocialMedia
}