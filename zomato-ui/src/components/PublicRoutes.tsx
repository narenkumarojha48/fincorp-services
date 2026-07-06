import React from 'react'
import { useAppContext } from '../contexts/appContext'
import {Navigate,Outlet} from 'react-router-dom'

const PublicRoutes = () => {
   const{loading,isAuth} = useAppContext()
   if(loading) return <div>Loading....</div>
    return isAuth ? <Navigate to="/"/>:<Outlet/>
  
}

export default PublicRoutes