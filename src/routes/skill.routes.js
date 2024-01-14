import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addSkill, getSkills } from "../controllers/skill.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/add-skill").post(verifyJWT,
    upload.single("displayImage"),
    addSkill
)

router.route("/get-skills").get(getSkills)
export default router