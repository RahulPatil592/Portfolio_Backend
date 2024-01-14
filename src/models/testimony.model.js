import mongoose,{Schema} from "mongoose";

const testimonialSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
        profession:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            default:""
        }
    },
    {
        timestamps:true
    }
)


export const Testimony=mongoose.model("Testimony",testimonialSchema)