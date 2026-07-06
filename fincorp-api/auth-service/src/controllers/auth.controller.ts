import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest,Role ,MyTokenPayload,IUser} from "../types/types.js";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { auth2Client } from "../config/googleAuthConfig.js";
import axios from "axios";


export const LoginController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const { name, email, image, roles } = req.body;
    const { code,roles } = req.body;
    if(!code){
      res.status(400).json({message:"code from google is missing"})
    }
    // 1. Exchange the code for tokens
    const { tokens } = await auth2Client.getToken(code);
     if(!tokens){
      res.status(400).json({message:"tokens from google is missing"})
    }
     if(!tokens.id_token){
      res.status(400).json({message:"google id_token missing"})
    }
    auth2Client.setCredentials(tokens);
    
    // const userres = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`)
    // const {email,name,picture} =  userres.data
    // console.log("userres.data",userres.data)
    const ticket = await auth2Client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID as string 
    });
    const gpayload = ticket.getPayload();
    if (!gpayload || !gpayload.email) {
      return res.status(400).json({ message: "Google auth failed" });
    }
    const {email,name,picture,sub} = gpayload

    let user = await UserModel.findOne({ email });
    if (!user) {
      if(email && name && picture){
        user = await UserModel.create({
        name:name,
        email:email,
        image:picture,
        roles: [roles || "customer"],
        
      });
      }
      

      // return res.status(200).json({ msg: "User created success", token, user });
    }
    if( !user?._id || !user?.roles ){
      res.status(400).json({ msg: "User _id "})
    }
    const mpayload = {
      id: user?._id.toString(),
      roles: user?.roles,
    };

    let token = jwt.sign(mpayload, process.env.JWT_SECRET as string, {
      expiresIn: "10m",
    });
    let refreshtoken = jwt.sign(
      mpayload,
      // {user:{ id: user._id, role: user.role }},
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" },
    );
    res.cookie('token', token, {
    httpOnly: true,    // Prevents JavaScript access (XSS protection)
    // secure: true,      // Only sent over HTTPS
    sameSite: 'lax',   // CSRF protection
});
    res.cookie("refreshtoken",refreshtoken,{httpOnly:true,maxAge:7*24*60*60*1000})
    // res.cookie("refreshtoken", refreshtoken, {
    //   httpOnly: true,
    //   secure: true, // Always true in production (requires HTTPS)
    //   sameSite: "lax", // "lax" is usually the safest bet for SPAs
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   path: "/api/auth/refresh-token", // Extra Security: Only send cookie to the refresh endpoint
    // });
    return res.status(200).json({ message: "User login success", token, user });
  } catch (error) {
    // res.status(500).json({msg:error})
    next(error);
  }
};

let ALLOWED_ROLES:Role[]=["customer","rider","seller"]

export const AddRoleController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if(!req.user){
      return res.status(401).json({message:"Unauthorized"})
    }
    const {id} = req.user
    const {roles} = req.body as {roles:Role}
    if(!ALLOWED_ROLES.includes(roles)){
      res.status(400).json({message:"Invalid role"})
    }
    let user = await UserModel.findByIdAndUpdate(id,{roles},{returnDocument:'after'})
    if(!user){
      res.status(400).json({message:"User does not exist"})
    }
    let token
    if(user){
      const payload: MyTokenPayload = {
      id: user._id.toString(),
      roles: user.roles,
    };
    token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "10m",
    });
    }
     

    
    
    res.json({token,user});
  } catch (error) {}
};

export const RefreshTokenController = async (req: Request, res: Response) => {
  try {
    let refreshtoken = req.cookies.refreshtoken
    if(!refreshtoken){
      return res.status(401).json({message:"Refresh token missing"})
    }
    let decoded:any
    try {
      decoded = jwt.verify(
        refreshtoken,
        process.env.JWT_REFRESH_SECRET as string,
      );
    } catch (error: any) {
      res.clearCookie("token");
      res.clearCookie("refreshtoken");
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({ message: "REFRESH_EXPIRED" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "INVALID_TOKEN" });
      }

      if (error.name === "NotBeforeError") {
        return res.status(403).json({ message: "TOKEN_NOT_ACTIVE" });
      }
      return res.status(403).json({ message: "INVALID_REFRESH" });

    }

    // ✅ OPTIONAL BUT IMPORTANT: Check in DB
    // const stored = await db.sessions.findOne({ token: hash(refreshToken) });
    // if (!stored) return res.status(403).json({ message: "TOKEN_REUSE_DETECTED" });

    // ✅ Create new access token
    const payload = {id:decoded.id,roles:decoded.roles}
     
   
     const  newaccestoken = jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:'5m'})
     res.cookie("token",newaccestoken,{httpOnly:true,secure:false,sameSite:"lax"})
    
    return res.status(200).json({message:"New access token genrated successfully "})
    // res.send("This is refresh controller");
  } catch (err:any) {

    return res.status(500).json({ message: "AUTH_REFRESH_ERROR" });
  }
};

export const RegisterController = async (req: Request, res: Response) => {
  try {
    res.send("This is login controller");
  } catch (error) {}
};

export const LogoutController = async (req: Request, res: Response) => {
  try {
    res.send("This is login controller");
  } catch (error) {}
};

export const TokenController = async (req: Request, res: Response) => {
  try {
    res.send("This is login controller");
  } catch (error) {}
};



export const MyProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
     const user = req.user
    res.json(user);
  } catch (error) {}
};
