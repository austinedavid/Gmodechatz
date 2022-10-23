import React, {useState, useEffect, useRef} from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import EmojiPicker from 'emoji-picker-react';
import {axiosInstance} from '../axiosInstance'
import {useDispatch, useSelector} from 'react-redux'

// below is our style for the jsx
const Container = styled.div`
    width: 80%;
    height: 70%;
    background-color: white;
    border-radius: 20px;
    padding-left: 10px;
    display: grid;
    grid-template-columns: 10% 80% 10%;
    align-items: center;
    position: relative;

    @media (max-width: 707px){
        width: 100%;
    }
    
    .emoji-div{
        color: goldenrod;
    }

    textarea{
        height: 100%;
        padding: 5px;
        border: 0ch;
        font-size: 16px;

        &:focus{
            outline: none;
        }
    }

    .send-icon-div{
        margin-left: 10px;
        color: blue;
    }

    .select-emoji-div{
        position: absolute;
        left: 0;
        top: -23rem;
    }
`

const ChatInput = ({sendmsg, setsendmsg, socket, allmsg, setallmsg}) => {
    const[showemoji, setshowemoji] = useState(false)
    const[msg, setmsg] = useState("")
    const inputRef = useRef()
    const {currentUser} = useSelector((state)=> state.currentUser)
    const {friend} = useSelector((state)=> state.friend)

    // function to control emoji inputting
    const handleEnterEmoji = (emoji, event)=>{
        let message = msg;
        message += emoji.emoji
        setmsg(message)
    }

    // here we run a function to execute submission of message to backend
    const handleSubmit = async()=>{
        setsendmsg(msg)
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                token: `Bearer ${currentUser.token}`
            }
        }
        try {
            const datares = await axiosInstance.post('makechat', {message: msg, to: friend._id}, config)
          
        } catch (error) {
            console.log(error)
        }

        // after handling send message to backend, we also emit message to the socket.io
        socket.emit("send-msg", {
            to: friend._id,
            from: currentUser._id,
            message: msg
        })

        let msgs = [...allmsg]
        msgs.push({sender:currentUser._id, message: msg})
        setallmsg(msgs)
        setmsg('')
    }
  return (
    <Container>
        <div className='emoji-div'>
            {
                showemoji?<KeyboardIcon onClick={()=> {
                    setshowemoji(false)
                    inputRef.current.focus()
                }} style={{cursor: "pointer"}}/> :
                <EmojiEmotionsIcon onClick={()=> {
                    setshowemoji(true)
                    
                }} style={{cursor: "pointer"}}/>
            }
             {
            showemoji &&    <div className='select-emoji-div'>
            <EmojiPicker onEmojiClick={handleEnterEmoji} height={370} autoFocusSearch={true}/>
        </div>
        }
            
        </div>
        <textarea value={msg} placeholder='MESSAGE...' ref={inputRef} onChange={(e)=> setmsg(e.target.value)}/>
        <div className='send-icon-div'>
            <SendIcon style={{cursor: "pointer"}} onClick={handleSubmit}/>
        </div>
       
        
    </Container>
  )
}

export default ChatInput