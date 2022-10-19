import React,{useRef} from 'react'
import styled from 'styled-components'
import {TextField} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// styling below here
const Container  = styled.div`
  width: 600px;
  text-align: center;
  color: white;

  .bold-div{
    margin-bottom: 2rem;
    h4{
      font-size: 30px;
      font-weight: bold;
    }
  }
  p{
    font-size: 20px;
    font-weight: bold;
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
      }
    }
  }
`

const EmailInput = ({setpage, page, setinfos, infos}) => {
  const emailRef = useRef()
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
          <div className='getstarted' onClick={()=>{
            if(infos.email.length <= 2){
              emailRef.current.focus()
              return toast('enter valid email')
            }
            setpage(page+1)
          } }>
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