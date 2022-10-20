import React from 'react'
import styled from 'styled-components'
import chatboxImg from '../images/chatboximg.jpg'

// below is styles for our jsx
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
   
    margin-left: 1rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url(${chatboxImg});
    background-size: cover;
`
// below is our jsx
const Chatbox = () => {
  return (
    <Container>

    </Container>
  )
}

export default Chatbox