import mongoose from "mongoose";

const docSchema = mongoose.Schema({
    image:{type:String,
        required:true
    }
},)

export const SingleLocalDocSchema = mongoose.models("SingleLocalDocSchema") || mongoose.model("SingleLocalDocSchema",docSchema)