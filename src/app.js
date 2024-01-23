import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
import userRouter from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js"
import skillRouter from "./routes/skill.routes.js"
import testimonyRouter from "./routes/testimony.routes.js"
import socialMediaRouter from "./routes/socialmedia.routes.js"

app.use("/v1/users", userRouter)
app.use("/v1/projects", projectRouter)
app.use("/v1/skills", skillRouter)
app.use("/v1/testimonials", testimonyRouter)
app.use("/v1/medias", socialMediaRouter)


export { app }