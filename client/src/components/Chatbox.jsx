import React,{useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import chatboxImg from '../images/chatboximg.jpg'
import {Avatar} from '@mui/material'
import {useSelector} from 'react-redux'
import ChatInput from './ChatInput'
import chatBot from '../images/chatbot.gif'
import {axiosInstance} from '../axiosInstance'
import {io} from 'socket.io-client'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// below is styles for our jsx
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    margin-left: 1rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url(${chatboxImg});
    background-size: cover;
    display: grid;
    grid-template-rows: ${(prop)=> prop.friend && " 10% 75% 15%"} ;

    @media (max-width:450px){
        position: absolute;
        margin-left: 0rem;
        
        height: 100%;
        background-color: black;
        transition: all 0.5s ease;
        transform: translateX(${(prop)=> prop.shift? "-100%": "0%"})
      }

    .chat-box-nav{
      background-color: black;
      box-shadow: 2px 10px 12px 1px rgba(138,129,129,0.75);
      -webkit-box-shadow: 2px 10px 12px 1px rgba(138,129,129,0.75);
      -moz-box-shadow: 2px 10px 12px 1px rgba(138,129,129,0.75);

      display: flex;
      align-items: center;
      justify-content: center;
      .back-arrow{
        display: none;
      }

      @media (max-width:450px){
        justify-content: space-between;
        padding: 0 5px;

        .back-arrow{
        display: block;
        cursor: pointer;
      }
      }

      .inner-nav{
        display: flex;

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
      
    }
    .chat-messages{
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow-y: scroll;

      .users-own{
        display: flex; 
        flex-direction: row-reverse;
        margin-bottom: 5px;

        .msg{
          max-width: 250px;
          background-color: #0c3011;
          margin-right: 5px;
          padding: 5px;
          border-radius: 15px;

          p{
            color: white;
            margin-left: 5px;
          }
        }
      }
      .receiver-message{
        display: flex;
        margin-bottom: 5px;

        .msg{
          max-width: 250px;
          background-color: #36363b;
          margin-left: 5px;
          padding: 5px;
          border-radius: 15px;

          p{
            color: white;
            margin-left: 5px;
          }
        }
      }
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
const Chatbox = ({shift, setshift}) => {
  const {friend} = useSelector((state)=> state.friend)
  const{currentUser} = useSelector((state)=> state.currentUser)
  const[sendmsg, setsendmsg] = useState("")
  const[allmsg, setallmsg] = useState([])
  const host = "https://gmodechatz.herokuapp.com/"
  const socket = io(host)
  const[arrivalmsg, setarrivalmsg] = useState(null)
 const fromUser = true
 const scrollRef = useRef()

//  making use of useEffect to get our chats from database
useEffect(()=>{
  const config = {
    headers:{
      "Content-Type": "application/json",
      token: `Bearer ${currentUser.token}`
    }
  }

  const getAllCaht = async()=>{
    try {
      const fetchmessage = await axiosInstance.post('getchat', {to: friend._id}, config).then((res)=>{
        setallmsg(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  getAllCaht()
},[friend])

// creating a use effect that will run immediatly, which will add the id of the user to the array of users in backend
useEffect(()=>{
  socket.on("connect", ()=>{
    console.log(socket.id)
  })
 socket.emit("add-user", currentUser._id)
 
},[currentUser])

// using useeffect hook to grab an incoming mesages from the socket.io
useEffect(()=>{
  if(socket){
    socket.on("msg-receive", (newmsg)=>{
      setarrivalmsg({sender: friend._id, message: newmsg})
    })
  }
},[])

// pushing the incoming messages to the allmsg array
useEffect(()=>{
  arrivalmsg && setallmsg((prev)=> [...prev, arrivalmsg])
},[arrivalmsg])

// this is to scroll to the button of the page with arrival of new messages

  return (
    <Container friend={friend}>
      {
        friend? (
          <>
        <div className='chat-box-nav'>
          <div className='back-arrow'>
          <KeyboardBackspaceIcon style={{color: "white"}} onClick={()=> setshift(false)}/>
          </div>
          <div className='inner-nav'>
        <div className='avatar'><Avatar src={friend.profileUrl}/></div>
        <div className='chatter-details'>
          <h5>{friend.username}</h5>
          <p>{friend.email}</p>
        </div>
        </div>
      </div>
      <div  className='chat-messages'>
        {
          allmsg.map((items)=>(
            <div key={items._id} className={currentUser._id === items.sender? "users-own":"receiver-message" }>
              <Avatar src={currentUser._id === items.sender? currentUser.profileUrl: friend.profileUrl} sx={{ width: 24, height: 24 }}/>
              <div className='msg'>
              <p>{items.message}</p>
              </div>
            </div>
          ))
        }
       
      </div>
      <div className='chat-input-div'>
        <ChatInput setsendmsg={setsendmsg} sendmsg={sendmsg} socket={socket} allmsg={allmsg} setallmsg={setallmsg}/>
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