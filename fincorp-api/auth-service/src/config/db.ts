import mongoose from "mongoose";


export const connectMongoDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_DB_URL as string,{dbName:"fincorp_mongodb"})
       console.log("connected to mongodb")
    } catch (error) {
        console.log(error)
    }
    
}