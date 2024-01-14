import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addTestimony, getTestimonials } from "../controllers/testimony.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/add-testimony").post(verifyJWT,upload.single("profileImage"),addTestimony)

router.route("/get-testimonials").get(getTestimonials)

export default router