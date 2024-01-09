import express from "express"
import cors from "cors"

const app=express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

import projectRouter from "./routes/project.routes.js"
import skillRouter from "./routes/skill.routes.js"

app.use("/api/v1/projects",projectRouter)
app.use("/api/v1/skills",skillRouter)

export {app}