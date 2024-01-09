import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProject, getProjects } from "../controllers/project.controller.js";
const router=Router()

router.route("/add-project").post(upload.fields([
    {
        name:"coverImage",
        maxCount:1  
    },
    {
        name:"screenShots",
        maxCount:5
    }
]),addProject)

router.route("/get-projects").get(getProjects)

export default router