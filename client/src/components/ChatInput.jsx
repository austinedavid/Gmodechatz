import React, {useState, useEffect, useRef} from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import EmojiPicker from 'emoji-picker-react';

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

const ChatInput = () => {
    const[showemoji, setshowemoji] = useState(false)
    const[msg, setmsg] = useState("")
    const inputRef = useRef()

    // function to control emoji inputting
    const handleEnterEmoji = (emoji, event)=>{
        let message = msg;
        message += emoji.emoji
        setmsg(message)
    }

    // here we run a function to execute submission of message to backend
    const handleSubmit = ()=>{
        alert(msg)
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