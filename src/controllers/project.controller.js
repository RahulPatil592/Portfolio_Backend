import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";


const uploadProject = async (screenShots, name, description, gitLink, webLink, category, tags, files) => {
    const coverImageLocalPath = files?.coverImage[0]?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is required")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    let screenShotUrls = []
    for (let i = 0; i < screenShots.length; i++) {
        const response = await uploadOnCloudinary(screenShots[i].path);
        screenShotUrls.push(response.url)
    }

    const project = await Project.create(
        {
            name,
            description,
            gitLink,
            webLink,
            coverImage: coverImage.url,
            screenShots: screenShotUrls,
            category,
            tags
        }
    )
}

const addProject = asyncHandler(async (req, res) => {
    const { name, description, gitLink, webLink, category, tags } = req.body
    if (!name || !description || !category || !tags) {
        throw new ApiError(400, "All fields are required")
    }
    const tagsArray=tags.split(" ");
    const existedProject = await Project.findOne({ name })
    if (existedProject) {
        throw new ApiError(409, "User already exist")
    }

    const coverImageLocalPath = req.files?.coverImage[0]?.path
   
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is required")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    let screenShotUrls = []
    if (req.files && Array.isArray(req.files?.screenShots) && req.files.screenShots.length > 0) {
        
    for (let i = 0; i < req.files.screenShots.length; i++) {
        const response = await uploadOnCloudinary(req.files.screenShots[i].path);
        screenShotUrls.push(response.url)
    }
    }
    

    const project = await Project.create(
        {
            name,
            description,
            gitLink,
            webLink,
            coverImage: coverImage.url,
            screenShots: screenShotUrls,
            category,
            tags:tagsArray
        }
    )
   
    // if (req.files && Array.isArray(req.files?.screenShots) && req.files.screenShots.length > 0) {
    //     uploadProject(req.files.screenShots, name, description, gitLink, webLink, category, tags, req.files)
    //         .then(() => {
    //             console.log("Uploaded");
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         })
    // }

    return res
        .status(200)
        .json(
            new ApiResponse(200,project, "Project addes successfully")
        )
})

const getProjects =asyncHandler(async(req,res)=>{
    const projects=await Project.find()
    const categories=await Project.aggregate([
        {
            $group:{
                _id:"$category"
            }
        }
    ])
    
    return res
    .status(200)
    .json([projects,categories])
})

export {
    addProject,
    getProjects
}