import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import appUploadRoutes from '../src/routes/upload.route.js'
import otpRoutes from "./routes/otp.route.js";
import contactRoutes from "./routes/contact.route.js";
import { ratelimiter } from "./utils/app.rate.limit.js";
import appHealth from "./utils/appHealth.js";
import multerUpload from "./utils/multer.configs.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(ratelimiter)
app.use(express.urlencoded({extended:true}))
const connectToDb = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL, { dbName: "FINDOCSDB" })
        .then(() => { console.log("Connected to mongodb"); });

    } catch (error) {
        console.log("Error connecting mongodb", error.message);
    }
};
// app.use("/uploads",express.static("uploaddocs"))
app.use("/api/v1/fileupload",appUploadRoutes)
app.use("/api/v1/otp", otpRoutes)
app.use("/api/v1/contact", contactRoutes)
app.use("/",appHealth)

app.use((error,req,res,next)=>{
    const message = error.message || "Server error"
    const statusCode = error.statusCode || 500
   return res.status(statusCode).json({message:message})
})
app.listen(PORT, () => {
  connectToDb()
  console.log("Upload service is listening on port", PORT);
  
});
