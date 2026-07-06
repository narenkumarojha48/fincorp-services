// Library imports
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// userdefined functions imports
import appRoutes from './routes/index.route.js'
import { connectMongoDB } from './config/db.js'
import isAuth from './middlewares/isauth.js'
import {errorhandler} from './middlewares/errorhandler.js'
const router = express.Router()
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}))
// app.use(isAuth)
app.use("/api/v1",appRoutes)
const port = process.env.PORT || 3000
console.log("apple")
app.get("/",(req,res)=>{return res.json({if:"server is running on"})})
app.use(errorhandler)
app.listen(port,()=>{console.log("Server is running on port",port)
    connectMongoDB()
})