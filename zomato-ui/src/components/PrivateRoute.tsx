import { useState } from "react"
import { useLocation ,Navigate, Outlet} from "react-router-dom"
import { useAppContext } from "../contexts/appContext.js";



const PrivateRoute = () => {
  const{user,loading,isAuth,location} = useAppContext()
    const currentRouteLocation = useLocation()
    if(loading) return null;
    if(!isAuth){
      return <Navigate to={"/login"}/>
    }
    if(!user?.role && currentRouteLocation.pathname !== "/select-role"){
      return <Navigate to={"/select-role"}/>
    }
    // if(user?.role !== null && currentRouteLocation.pathname === "/select-role"){
    //   return <Navigate to={"/"}/>
    // }
    return <Outlet/>
  
}
export default PrivateRoute