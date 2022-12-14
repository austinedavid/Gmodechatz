import React,{useRef} from 'react'
import styled from 'styled-components'
import {TextField} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {axiosInstance} from '../axiosInstance'

// styling below here
const Container  = styled.div`
  width: 600px;
  text-align: center;
  color: white;

  @media(max-width: 700px){
    width: 500px;
  }
  @media(max-width: 540px){
    width: 400px;
  }
  @media(max-width: 412px){
    width: 300px!important;
  }
  @media(max-width: 285px){
    width: 250px;
  }

  .bold-div{
    margin-bottom: 2rem;
    h4{
      font-size: 30px;
      font-weight: bold;

      @media(max-width: 700px){
        font-size: 25px;
      }
      @media(max-width: 540px){
        font-size: 20px;
      }
      @media(max-width: 285px){
        font-size: 15px;
      }
    }
  }
  p{
    font-size: 20px;
    font-weight: bold;

    @media(max-width: 540px){
        font-size: 16px;
    }
    @media(max-width: 285px){
        font-size: 12px;
      }
  }
  .input-container{
    margin-top: 10px;
    .input-div{
      width: 100%;
      height: 60px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      @media(max-width: 412px){
      width: 300px!important;
      display: grid;
      grid-template-columns: 1fr;
      }
      
      

      input{
        flex: 8;
        margin-left: 10px;
        margin-right: 10px;
        padding: 15px 10px;
        border: 0ch;
        font-size: 20px;

        &:focus{
          outline: none;
        }
      }
      .getstarted{
        flex: 4;
        height: 100%;
        background-color: red;
        display: flex;
        color: white;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        @media(max-width: 412px){
          height: 3.4rem;
        }
      }
    }
  }
`

const EmailInput = ({setpage, page, setinfos, infos}) => {
  const emailRef = useRef()

  // handling email verification to check is a user with the same email already exist
  const handleEmailCheck = async()=>{
    
    if(infos.email.length <= 2){
      emailRef.current.focus()
      return toast('enter valid email')
    }
    
      const emailCheck = await axiosInstance.post('checkinguser', {email: infos.email})
       if(emailCheck.status === 200){
        return toast(emailCheck.data)
       }else{
        setpage(page +1)
       }

  }
  return (
    <Container>
      <div className='bold-div'>
        <h4>Unlimited chat platform, your chat app</h4>
        <h4>enjoy as you explore !!!</h4>
      </div>
      <p>Chat everywhere, feel your friends around </p>
      <div className='input-container'>
        <p>ready to chat, enter your email below to proceed</p>
        <div className='input-div'>
          <input ref={emailRef} placeholder='enter email' type='email' value={infos.email} onChange={(e)=> setinfos({...infos, email: e.target.value})}/>
          <div className='getstarted' onClick={handleEmailCheck}>
            <p>Get Started</p>
            <ArrowForwardIosIcon/>
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

export default EmailInput