import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
const Protected = ({children}) => {
  let location = useLocation();
   const storedData = localStorage.getItem("login");
   console.log("storedData",storedData)
    if(!storedData ){
      return   <Navigate to="/" state={{ from: location}} replace />
       }
  return children
}
export default Protected