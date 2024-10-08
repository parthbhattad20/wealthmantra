import React from 'react'
import { useAuth } from './auth'
import { Navigate } from 'react-router-dom';

function RequireAuth({children}) {
    const auth = useAuth();
    if(auth.user.username === ""){
        return <Navigate to = '/login'/>
    }
  return children
  
}

export default RequireAuth