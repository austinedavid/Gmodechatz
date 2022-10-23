import React from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Protected = ({children}) => {
  const {currentUser} = useSelector((state)=> state.currentUser)
  console.log(currentUser)
    const loggedin = false
  if(!currentUser){
    return <Navigate to='/login'/>
  }else{
    return children
  }
}

export default Protected