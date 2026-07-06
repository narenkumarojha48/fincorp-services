import React, { createContext, useContext ,useState, type ReactNode} from "react";
import {type IAppContext ,type IUser, type ILocationData } from "../types";
const AppContext = createContext<IAppContext | null>(null);

interface AppContextProviderProps {
  children:ReactNode;
 
}
export function AppContextProvider({ children }:AppContextProviderProps) {
  const [user,setUser] = useState<IUser|null>(null);
  const [loading,setLoading] = useState(false)
  const [isAuth,setIsauth] = useState(false)
  const [isOnline,setIsOnline] = useState(true);
  const [location,setLocation] = useState<ILocationData|null>(null)
  const [city,setCity] = useState("")
  return (
    <>
      <AppContext.Provider
        value={{
          children,
          user,
          setUser,
          isAuth,
          setIsauth,
          loading,
          isOnline,
          setIsOnline, 
          setLoading,
          location,
          setLocation,
          city,
          setCity,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export function useAppContext(){
    const ctx = useContext(AppContext)
    if(!ctx){
        throw new Error("App context not present")
    }
    return ctx
}