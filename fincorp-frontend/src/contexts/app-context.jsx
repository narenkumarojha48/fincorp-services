import { useState,useEffect } from "react";
import { createContext ,useContext } from "react";
import axios from "axios"
import config from "../config";


const AppContext = createContext({})


export const AppContextProvider=({children})=>{
  const [user,setUser] = useState({})
  const [isAuth,setIsAuth] = useState(false)
  const [loading,setLoading] = useState(false)
  const [location,setLocation] = useState("")
  const [city,setCity] = useState("Fetching Location...")
  const [loadinglocation,setLoadingLocation] = useState("")
  const [visitorCount,setVisitorCount] = useState(0)
  
  async function fetchuser(params) {
    try {
        const token = localStorage.getItem("token")
        const {data} = await axios.put(`${config.apiUrl}/auth/me`,{headers:{
            Authorization:`Bearer ${token}`
        }})
        setUser(data.user)
    } catch (error) {
        console.log(error)
    }
    finally{

    }
  }
  useEffect(()=>{fetchuser()},[])

  useEffect(() => {
    const visitorKey = 'fincorp_has_visited'
    const countKey = 'fincorp_visitor_count'
    const hasVisited = localStorage.getItem(visitorKey) === 'true'
    const storedCount = Number(localStorage.getItem(countKey) || 0)

    if (!hasVisited) {
      const updatedCount = storedCount + 1
      localStorage.setItem(visitorKey, 'true')
      localStorage.setItem(countKey, String(updatedCount))
      setVisitorCount(updatedCount)
    } else {
      setVisitorCount(storedCount)
    }
  }, [])
  
  return(
        <AppContext.Provider value={{user,setIsAuth,setUser,isAuth,loading,setLoading,location,setLocation,visitorCount}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext)
    if(!context){
        throw new Error("useAppContext should be used within AppContextProvider")
    }
    return context
}