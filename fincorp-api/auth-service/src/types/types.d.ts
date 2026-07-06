import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request,Response,NextFunction } from "express"
import {Document, Types} from "mongoose";


export type Role = "customer" | "rider" | "seller" | null
export interface IUser extends Document{
    name:string;
    email:string;
    image:string;
    socialProviders: {
    googleId: { type: String },
    facebookId: { type: String },
    linkedinId: { type: String }
  },
    roles:Role[];
}

interface MyTokenPayload extends JwtPayload {
  id:  string | Types.ObjectId;
  roles: Role[];
}

export interface AuthenticatedRequest extends Request{
    user?: MyTokenPayload;
}

// Agent types
export interface IAgent extends Document {
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  loanTypes: string[];
  aadharNumber: string;
  panNumber: string;
  address?: string;
  password: string;
  kycStatus: "not_submitted" | "pending" | "verified";
  agentId: string;
  isActive: boolean;
}

export interface AgentTokenPayload extends JwtPayload {
  id: string | Types.ObjectId;
  agentId: string;
}

export interface AuthenticatedAgentRequest extends Request {
  agent?: AgentTokenPayload;
}


