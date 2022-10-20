import React from 'react'
import styled from 'styled-components'
import logo from '../images/mylogo2.png'
import {Avatar} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Contacts from '../components/Contacts';
import Chatbox from '../components/Chatbox';

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

    .logo-div{
      display: flex;
      img{
        width: 2rem;
        margin-right: 5px;
      }
      h4{
        font-size: 1.6rem;
        font-weight: bold;
      }
    }

    .menu-div{
      display: flex;

      .avatar-div{
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  .chat-view{
    width: 100%;
    height: calc(100vh - 70px);
    padding: 0px 10rem 2rem 10rem;
    
    .inner-chat-view{
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 30% 70%;
    }
  }
`
// our jsx below
const Chatpage = () => {
  return (
    <Container>
      <div className='nav-bar'>
        <div className='logo-div'><img src={logo}/><h4>Chatz</h4></div>
        <div className='menu-div'>
          <div className='avatar-div'><Avatar/><ArrowDropDownIcon/></div>
        </div>
      </div>
      <div className='chat-view'>
        <div className='inner-chat-view'>
          <Contacts/>
          <Chatbox/>
        </div>
      </div>
    </Container>
  )
}

export default Chatpage