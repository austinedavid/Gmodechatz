import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// below is our styling for the jsx
const Container = styled.div`
  width: 400px;
  color: white;
  
 
  

  .first-div{
    font-size: 30px;
    color: white;
    margin-bottom: 1rem;
  }
  .middle-div{
    color: white;
    font-size: 20px;
    text-align: left;

  }
  .third-div{
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    .email{
    padding: 15px 10px;
    margin-bottom: 10px;
    }

    .password-div{
      width: 100%;
      height: 2.6rem;
      background-color: white;
      display: flex; 
      align-items: center;
      justify-content: space-between;
      padding: 0px 10px;

      .password{
      width: 80%;
      padding: 10px 0px;
      margin-right: 10px;
      border: 0px;

      &:focus{
        outline: none;
      }
      }

      
    }

    .checkbox-div{
        width: 100%;
        display: flex;
        margin-top: 10px;

        p{
          margin-left: 10px;
        }
        input{
          cursor: pointer;
        }
      }
    
  }
 .next-btn{
  width: 100%;
  height: 2.6rem;
  background-color: red;
  color: white;
  display: flex; 
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 5px;

  p{
    font-weight: bold;
  }
 }

`

const Password = ({setpage, page, setinfos, infos}) => {
  const[visible, setvisible] = useState(false)
  const passRef = useRef()
  return (
    <Container>
      <div className='first-div'>
        <h4>Create a password to start</h4>
        <h4>your membership</h4>
      </div>
      <div className='middle-div'>
        <p>just a few steps to be done</p>
        <p>we hate paperwork,too.</p>
      </div>
      <div  className='third-div'>
        <input type="text" className='email' defaultValue={infos.email}/>
        <div className='password-div'>
          <input ref={passRef} type={visible? "text": "password"} className='password' value={infos.Password} onChange={(e)=>setinfos({...infos, password: e.target.value})}/>
            {visible? <RemoveRedEyeIcon onClick={()=>setvisible(false)} style={{color: 'black', cursor: 'pointer'}} /> : <VisibilityOffIcon style={{color: 'black', cursor: 'pointer'}} onClick={()=>setvisible(true)}/> }
        </div>
        
        <div className='checkbox-div'>
          <input type='checkbox'/>
          <p>I want to receive notifications</p>
        </div>
      </div>
      <div className='next-btn' onClick={()=>{
        if(infos.password === " "){
          passRef.current.focus()
          return toast("password required")
        }
        setpage(page +1)
      }}>
        <p>NEXT</p>
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

export default Password