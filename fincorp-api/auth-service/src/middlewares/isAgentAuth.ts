import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AgentModel from "../models/AgentModel.js";
import { AuthenticatedAgentRequest, AgentTokenPayload } from "../types/types.js";

const isAgentAuth = async (
  req: AuthenticatedAgentRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Auth header missing Bearer key" });
  }

  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AgentTokenPayload;

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const agent = await AgentModel.findById(decodedToken.id);
    if (!agent) {
      return res.status(400).json({ message: "Agent no longer exists" });
    }
    if (!agent.isActive) {
      return res.status(403).json({ message: "Agent account is deactivated" });
    }

    req.agent = decodedToken;
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

export default isAgentAuth;
