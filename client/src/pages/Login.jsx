import React,{useState} from 'react'
import styled from 'styled-components'
import bgchat from '../images/chat-bg3.webp'
import {Link,useNavigate} from 'react-router-dom'
import {axiosInstance} from '../axiosInstance'
import {signedUser, setloading, checkerror} from '../slice/userslice'
import {useDispatch, useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CircularProgress} from '@mui/material'


// below is our styling for jsx
const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  .navbar{
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
    padding: 10px;
    position: absolute;
    top: 0px;

    h4{
      font-size: 25px;
      font-weight: bold;
      color: #c90909;
      cursor: default;
    }
  }

  .Main-rapper{
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%), url(${bgchat});
    background-size: cover;
    display: flex; 
    align-items: center;
    justify-content: center;

    .form-wrapper{
      width: 500px;
      min-height: 400px;
      background-color: rgba(0,0,0,0.8);
      border-radius: 10px;
      padding: 2rem 3rem;

      h4{
        color: white;
        font-size: 30px;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      .inputgroup{
        display: flex;
        flex-direction: column;

        input{
          margin-bottom: 10px;
          font-size: 20px;
          padding: 10px;
          background-color: #2f2d2d;
          border: 0ch;
          color: white;

          &:focus{
            outline: none;
          }
        }
      }
      .login-submit{
        width: 100%;
        height: 2.6rem;
        background-color: red;
        color: white;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;

        p{
          font-size: 20px;
          font-weight: bold;
        }
      }
      .added-div{
        margin-top: 10px;
        color: #797474;
        display: flex; 
        align-items: center;
        justify-content: space-between;

        .checkbot-div{
          display: flex;

          p{
            margin-left: 5px;
          }
        }

        .help-div{
          cursor: pointer;
        }
      }

      .last-div{
        margin-top: 3rem;

        p{
          color: #797474;
        }
        span{
          color: white;
          cursor: pointer;
        }
      }
    }
  }
`
// below is our jsx

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{currentUser, loading} = useSelector((state)=> state.currentUser)
  
  const[user, setuser] = useState({
    email: "",
    password: ""
  })

  // to handle login of user to our chat
  const handleLogin = async()=>{
    if(!user.email){
      return toast("enter your email address")
    }
    if(!user.password){
      return toast("password required")
    }
    try {
      dispatch(setloading())
      const loggin = await axiosInstance.post('login', user).then((res)=>{
        dispatch(signedUser(res.data))
       navigate('/chatpage')
      })
    } catch (error) {
      dispatch(checkerror())
      return toast(error.response.data)
      
    }
  }

  return (
   <Container>
      <div className='navbar'>
        <h4>GmodeChatz</h4>
      </div>
      <div className='Main-rapper'>
        <div className='form-wrapper'>
          <h4>Sign in</h4>
          <div className='inputgroup'>
            <input onChange={(e)=>setuser({...user, email: e.target.value})} type='email' placeholder='email'/>
            <input onChange={(e)=>setuser({...user, password: e.target.value})} type='password' placeholder='password'/>
          </div>
          <div className='login-submit' onClick={handleLogin}>
            {loading? <CircularProgress color="inherit"  />:<p>sign in</p>}
          </div>
          <div className='added-div'>
            <div className='checkbot-div'>
              <input type='checkbox'/>
              <p>Remember me</p>
            </div>
            <div className='help-div'>
              <p>need help?</p>
            </div>
          </div>
          <div className='last-div'>
            <p>new to GmodeChatz? <Link to='/' style={{textDecoration: "none", color: "white"}}>sign up now</Link></p>
          </div>
        </div>
      </div>
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
   </Container>
  )
}

export default Login