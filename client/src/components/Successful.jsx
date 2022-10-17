
import React from 'react'
import succesfulGif from '../images/successful.gif'
import styled from 'styled-components'

// our style for the jsx
const Container = styled.div`
    width: 400px;
    color: white;
    text-align: center;
    img{
        width: 100%;
    }
    h4{
        margin-top: 1rem;
    }

    button{
        margin-top: 1rem;
        padding: 10px;
        color: white;
        font-weight: bold;
        background-color: red;
        border: 0ch;
        border-radius: 5px;
        cursor: pointer;
    }
`
// our jsx
const Successful = () => {
  return (
    <Container>
        <img src={succesfulGif}/>
        <h4>REGISTRATION SUCCESSFULL</h4>
        <button>LOGIN NOW</button>
    </Container>
  )
}

export default Successful