import React from 'react'
import styled from 'styled-components'
import chatboxImg from '../images/chatboximg.jpg'
import {Avatar} from '@mui/material'
import {useSelector} from 'react-redux'
import ChatInput from './ChatInput'
import chatBot from '../images/chatbot.gif'

// below is styles for our jsx
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
   
    margin-left: 1rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url(${chatboxImg});
    background-size: cover;
    display: grid;
    grid-template-rows: ${(prop)=> prop.friend && " 10% 75% 15%"} ;

    .chat-box-nav{
      background-color: black;
      box-shadow: 2px 10px 12px 1px rgba(138,129,129,0.75);
      -webkit-box-shadow: 2px 10px 12px 1px rgba(138,129,129,0.75);
      -moz-box-shadow: 2px 10px 12px 1px rgba(138,129,129,0.75);

      display: flex;
      align-items: center;
      justify-content: center;

      .chatter-details{
        color: white;
        margin-left: 10px;

        h5{
          font-size: 16px;
          font-weight: bold;
        }

        p{
          color: gray;
        }
      }
    }
    .chat-messages{

    }
    .chat-input-div{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bot-div{
      width: 100%;
      height: 100%;
      display: flex; 
      flex-direction: column;
      align-items: center;
      justify-content: center;
      

      img{
        width: 12rem;
        height: 12rem;
        border-radius: 50%;
        margin-bottom: 1rem;
      }

      h5{
        color: #2807ca;
        font-size: 20px;
      }
    }
`
// below is our jsx
const Chatbox = () => {
  const {friend} = useSelector((state)=> state.friend)
  const{currentUser} = useSelector((state)=> state.currentUser)
  console.log(friend)
  return (
    <Container friend={friend}>
      {
        friend? (
          <>
            <div className='chat-box-nav'>
        <div className='avatar'><Avatar/></div>
        <div className='chatter-details'>
          <h5>{friend.username}</h5>
          <p>{friend.email}</p>
        </div>
      </div>
      <div className='chat-messages'>

      </div>
      <div className='chat-input-div'>
        <ChatInput/>
      </div>
          </>
        ): (<div className='bot-div'>
              <img src={chatBot}/>
              <h5>welcome {currentUser.username}</h5>
              <h5>Select friends and enjoy your chats</h5>
        </div>)
      }
      
    </Container>
  )
}

export default Chatbox