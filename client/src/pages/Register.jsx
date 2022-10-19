import React,{useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import bgImage from '../images/chat-bg2.webp'
import EmailInput from '../components/EmailInput'
import Password from '../components/Password'
import Review from '../components/Review'
import Successful from '../components/Successful'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// below is our styling 
const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;

    .navbar{
        width: 100%;
        height: 70px;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        position: absolute;
        top: 0;

        .logo{
            font-size: 25px;
            font-weight: bold;
            color: #c90909;
            cursor: default;
        }

        .signin-btn{
            background-color: #c90909;
            color: white;
            padding: 10px 10px;
            border: 0ch;
            border-radius: 5px;
            cursor: pointer;
        }


    }
    .form-wrapper{
        width: 100%;
        height: 100vh;
       
        background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%), url(${bgImage});
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 1s ease;
        flex-direction: column;
        
        .end-submit{
            width: 400px;
            height: 2.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: red; 
            color: white;
            border-radius: 5px;
            margin-top: 10px;
            cursor: pointer;
        }
    }
`

const Register = () => {
    const [page, setpage] = useState(0)
    const navigate = useNavigate()
    const userRef = useRef()
    const [infos, setinfos] = useState({
        email: " ",
        password: " ",
        username: " ",
        profilepix: " "
    })

    console.log(infos)

    const returnedPage = ()=>{
        if(page === 0){
            return <EmailInput page={page} setpage={setpage} setinfos={setinfos} infos={infos}/>
        }else if (page === 1){
            return <Password  page={page} setpage={setpage} setinfos={setinfos} infos={infos}/>
        }else if(page === 2){
            return <Review userRef={userRef} page={page} setpage={setpage} setinfos={setinfos} infos={infos}/>
        }else{
            return <Successful/>
        }
    }

    // here we submit our form
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(infos.username.length <= 2){
            userRef.current.focus()
            return toast("username required")
        }
        setpage(page +1)
    }
  return (
   <Container>
        <div className='navbar'>
            <div >
                <h4 className='logo'>GmodeChatz</h4>
            </div>
            <div className='signin-div'>
                <button onClick={()=> navigate('/login')} className='signin-btn'>SIGNIN</button>
            </div>
        </div>
        <div className='form-wrapper'>
            {returnedPage()}
            {page === 2 && (<div className='end-submit' onClick={handleSubmit}>SUBMIT</div>)}
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

export default Register