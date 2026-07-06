import React, { type ReactNode} from "react";
// exported types
export type Role = "admin" | "seller" | "customer" | "rider" |null;
export type NetworkStatus = "checking" | "online" | "offline";

// exported interfaces
export interface IUser {
  name: string;
  email: string;
  image: string;
  role: Role[];
}

export interface ILocationData {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface IAppContext{
  children:ReactNode;
  user:IUser | null;
  loading:boolean;
  isAuth:boolean;
  isOnline:boolean;
  setIsOnline:React.Dispatch<React.SetStateAction<boolean>>;
  city:string;
  setCity:React.Dispatch<React.SetStateAction<string>>;
  setUser:React.Dispatch<React.SetStateAction<IUser|null>>;
  setIsauth:React.Dispatch<React.SetStateAction<boolean>>;
  setLoading:React.Dispatch<React.SetStateAction<boolean>>;
  location:ILocationData | null;
  setLocation:React.Dispatch<React.SetStateAction<ILocationData|null>>;
}

export interface UseOnlineStatusOptions {
  urls?:string[];
  interval?:number;
  timeout?:number;
  retries?:number;
  backOffFactor?:number;
}


