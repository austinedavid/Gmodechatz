import React, {useState} from 'react'
import styled from 'styled-components'
import logo from '../images/mylogo2.png'
import {Avatar} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Contacts from '../components/Contacts';
import Chatbox from '../components/Chatbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useSelector, useDispatch} from 'react-redux'
import {signedUser} from '../slice/userslice'

// our styles for the jsx below
const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: black;

  .nav-bar{
    width: 100%;
    height: 70px;
    background-color: #0e0e0e;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .setting-div{
      transition: all 0.5s ease;
      display: ${(prop)=> prop.showsetting? "flex": "none"};
      position: absolute;
      background-color: white;
      color: black;
      min-width: 120px;
      padding: 10px;
      top: 70px;
      right: 0px;
      z-index: 9999;
      
      flex-direction: column;
      align-items: center;
      .setting{
        cursor: pointer;
        margin-bottom: 5px;

        &:hover{
          color: blue;
        }
        
      }
      .logout{
        cursor: pointer;
        &:hover{
          color: red;
        }
      }

      .profile-pix{
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        p{
          color: blue;
          font-size: 20px;
        }
      }
    }

    .logo-div{
      display: flex;
      img{
        width: 2rem;
        margin-right: 5px;

        @media(max-width: 400px){
          width: 1.3rem;
          
        }
      }
      h4{
        font-size: 1.6rem;
        font-weight: bold;

        @media(max-width: 400px){
          font-size: 1.3rem;
          
        }
      }
    }

    .menu-div{
      display: flex;

      .avatar-div{
        display: flex;
        align-items: center;
        cursor: pointer;

        .down-arror{
          display: flex;
          flex-direction: column;
          position: relative;
          
          &:hover{
            .hidden-div{
              display: block;
            }
          }
          .hidden-div{
            display: none;
            position: absolute;
            top: 5rem;
          }
        }
      }
    }
  }

  .chat-view{
    width: 100%;
    height: calc(100vh - 70px);
    padding: 0px 10rem 2rem 10rem;
    overflow: hidden;
    position: relative;
    
    @media (max-width:1035px){
      padding: 0px 8rem 2rem 8rem;
    }
    @media (max-width:973px){
      padding: 0px 5rem 2rem 5rem;
    }
    @media (max-width:880px){
      padding: 0px 3rem 2rem 3rem;
    }
    @media (max-width:813px){
      padding: 0px 1rem 2rem 1rem;
    }
    @media (max-width:450px){
      padding: 0px 1rem 2rem 0rem;
      }
    
    .inner-chat-view{
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 30% 70%;

      @media (max-width:750px){
        grid-template-columns: 35% 65%;
      }
      @media (max-width:450px){
        grid-template-columns: 1fr;
      }
    
    }
  }
`
// our jsx below
const Chatpage = () => {
  const[shift, setshift] = useState(false)
  const[showsetting, setshowsetting] = useState(false)
  const {currentUser} = useSelector((state)=> state.currentUser)
  const dispatch = useDispatch()
  console.log(showsetting)
  return (
    <Container showsetting={showsetting}>
      <div className='nav-bar'>
        <div className='logo-div'><img src={logo}/><h4>Chatz</h4></div>
        <div className='menu-div'>
          <div className='avatar-div'>
            <MoreVertIcon style={{color: "white"}} onClick={()=>setshowsetting(!showsetting) }/>
          </div>
        </div>
        <div className='setting-div'>
          <div className='profile-pix'>
            <Avatar src={currentUser.profileUrl}/>
            <p>{currentUser.username}</p>
          </div>
          <div className='setting'><p>settings</p></div>
          <div className='logout' onClick={()=>dispatch(signedUser())}><p>logout</p></div>
        </div>
      </div>
      <div className='chat-view'>
        <div className='inner-chat-view'>
          <Contacts shift={shift} setshift={setshift}/>
          <Chatbox shift={shift} setshift={setshift}/>
        </div>
      </div>
    </Container>
  )
}

export default Chatpage