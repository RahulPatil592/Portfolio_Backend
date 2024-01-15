import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
import userRouter from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js"
import skillRouter from "./routes/skill.routes.js"
import testimonyRouter from "./routes/testimony.routes.js"


app.use("/api/v1/users",userRouter)
app.use("/api/v1/projects",projectRouter)
app.use("/api/v1/skills",skillRouter)
app.use("/api/v1/testimonials",testimonyRouter)


export {app}