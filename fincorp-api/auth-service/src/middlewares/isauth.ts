import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { AuthenticatedRequest, MyTokenPayload } from "../types/types.js";

const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers?.authorization;
  let accesstoken = req.cookies.token
  if (!authHeader || !accesstoken) {
    return res.status(401).json({ message: "Auth headers or access token not found" });
  }

  if (!authHeader.startsWith("Bearer ") || !accesstoken) {
    return res.status(401).json({ message: "Auth header missing Bearer key" });
  }

  try {
    const token = authHeader.split(" ")[1] || accesstoken;
    if (!token) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as MyTokenPayload;

    // FIXED: Removed the '|| decodedToken.user' logic that was blocking valid users
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await UserModel.findById(decodedToken.id);
    if (!user)
      return res.status(400).json({ message: "User no longer exists" });

    // Assign the payload to req.user
    // If your login controller used { id: user._id }, then req.user will have that ID.
    req.user = decodedToken;

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TOKEN_EXPIRED" });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "INVALID_TOKEN" });
    }

    if (err.name === "NotBeforeError") {
      return res.status(403).json({ message: "TOKEN_NOT_ACTIVE" });
    }

    return res.status(500).json({ message: "AUTH_ERROR" });
  }
};

export default isAuth;
