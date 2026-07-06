import mongoose,{Document,Schema} from "mongoose";

import { IUser } from "../types/types.js";

const UserSchema:Schema<IUser> = new Schema({
    name:{
        type:String,
        required:true,
        minLength:[4,"Minimum four characters are required"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:""
    },
    socialProviders: {
    googleId: { type: String, sparse: true },
    facebookId: { type: String, sparse: true },
    linkedinId: { type: String, sparse: true }
  },
    roles:[{
        type:String,
        default:null,
    }],
    
},{timestamps:true,})

const UserModel = mongoose.model<IUser>("UserModel",UserSchema)
export default UserModel