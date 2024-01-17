import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addSocialMedia, getSocialMedia } from "../controllers/socialmedia.controller.js";
const router = Router();

router.route("/add-socialmedia").post(verifyJWT, upload.single("img"), addSocialMedia)

router.route("/get-socialmedias").get(cache("socialMediaData"),getSocialMedia)

export default router