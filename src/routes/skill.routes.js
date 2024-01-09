import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addSkill, getSkills } from "../controllers/skill.controller.js";

const router=Router();

router.route("/add-skill").post(
    upload.single("displayImage"),
    addSkill
)

router.route("/get-skills").get(getSkills)
export default router