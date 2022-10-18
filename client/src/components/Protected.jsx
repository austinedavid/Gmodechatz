import React from 'react'
import {Navigate} from 'react-router-dom'

const Protected = ({children}) => {
    const loggedin = false
  if(!loggedin){
    return <Navigate to='/'/>
  }else{
    return children
  }
}

export default Protected