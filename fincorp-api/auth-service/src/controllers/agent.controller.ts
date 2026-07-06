import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AgentModel from "../models/AgentModel.js";
import { AuthenticatedAgentRequest } from "../types/types.js";

export const AgentRegisterController = async (
  req: AuthenticatedAgentRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, city, experience, loanTypes, aadharNumber, panNumber, address, password } = req.body;

    if (!name || !email || !phone || !city || !experience || !aadharNumber || !panNumber || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existing = await AgentModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An agent with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const agent = await AgentModel.create({
      name, email, phone, city, experience,
      loanTypes: loanTypes || [],
      aadharNumber, panNumber, address: address || "",
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Agent registered successfully",
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        city: agent.city,
        agentId: agent.agentId,
        kycStatus: agent.kycStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const AgentLoginController = async (
  req: AuthenticatedAgentRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const agent = await AgentModel.findOne({ email });
    if (!agent) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!agent.isActive) {
      return res.status(403).json({ message: "Account is deactivated. Contact admin." });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: agent._id.toString(),
      agentId: agent.agentId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        city: agent.city,
        experience: agent.experience,
        loanTypes: agent.loanTypes,
        agentId: agent.agentId,
        kycStatus: agent.kycStatus,
        aadharNumber: agent.aadharNumber,
        panNumber: agent.panNumber,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const AgentProfileController = async (
  req: AuthenticatedAgentRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = await AgentModel.findById(req.agent?.id).select("-password");
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    return res.status(200).json({ agent });
  } catch (error) {
    next(error);
  }
};
