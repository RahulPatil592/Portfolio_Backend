import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProject, getProjects } from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { cache } from "../middlewares/cache.middleware.js";

const router = Router()

router.route("/add-project").post(verifyJWT, upload.fields([
    {
        name: "coverImage",
        maxCount: 1
    },
    {
        name: "screenShots",
        maxCount: 5
    }
]), addProject)

router.route("/get-projects").get(cache("projectData"),getProjects)

export default router