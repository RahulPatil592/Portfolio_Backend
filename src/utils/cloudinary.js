import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
    try {


        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        //console.log(localFilePath)
        if (!localFilePath) return null;

        //upload file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully

        fs.unlinkSync(localFilePath);
        return response;


    } catch (error) {
        fs.unlinkSync(localFilePath)
        // remove the locally saved temporary saved file
        return null;
    }
}

export { uploadOnCloudinary }