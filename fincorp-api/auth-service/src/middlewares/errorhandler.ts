import { Response,Request,ErrorRequestHandler, NextFunction } from "express";
export const errorhandler = async(err:any,req:Request,res:Response,next:NextFunction)=>{
     
    return res.status(err.status|| 500).json({message:err.message ||"Internal server error"})
}