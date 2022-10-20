import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import {axiosInstance} from '../axiosInstance'
import {useSelector} from 'react-redux'
import {Avatar} from '@mui/material'

// below is styles for our jsx
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
   border: 1px solid #1f2021;
   overflow-y: scroll;
   

   .chat-div{
       width: 100%;
       background-color: #c5c0c0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        margin-top: 10px;
        border-radius: 20px;
        overflow: hidden;
        height: 2.4rem;

        input{
            border: 0ch;
            font-size: 16px;
            background-color: transparent;
            color: black;
            flex: 10;
            

            &:focus{
                outline: none;
            }
        }

        .search-icon-div{
            flex: 2;
            background-color: #0b0b43;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
   }
   h4{
    color: white;
    margin-top: 1rem;
    margin-left: 10px;
    margin-bottom: 10px;
    font-weight: bold;
   }

   .contact-div{
    width: 100%;
    display: flex;
    flex-direction: column;

    .contact-wrapper{
        color: white;
        width: 100%;
        display: flex;
        padding: 10px;
        background-color: #0e0e0e;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.5s ease;

        &:hover{
            background-color: #272626;
        }

        .profile-pix{
            margin-right: 10px;
        }
        .profile-name{
            display: flex; 
            flex-direction: column;

            h5{
                margin-bottom: 5px;
                font-size: 16px;
            }
            p{
                font-size: 12px;
                color: gray;
            }
        }
    }
   }
`
// below is our jsx
const Contacts = () => {
    const{currentUser} = useSelector((state)=> state.currentUser)
    const[myContacts, setmyContacts] = useState([])
    const[searched, setsearched] = useState("")
    
    // getting our contacts from the database
    useEffect(()=>{
        const config = {
            headers:{
                "Content-Type": "application/json",
                token: `Bearer ${currentUser.token}`
            }
        }
        const getUsers = async()=>{
            const gottenUser = await axiosInstance.get('getalluser', config).then((res)=>{
                setmyContacts(res.data)
            })
        }
        getUsers()
    },[])

    // creating function that will return our search
    const returnSearched = (items)=>{
       return items.filter((item)=> item.username.toLowerCase().includes(searched)) || items.filter((item)=> item.email.includes(searched))
    }
  return (
    <Container>
        <div className='chat-div'>
            <input placeholder='search for friends' type='text' onChange={(e)=> setsearched(e.target.value)}/>
            <div className='search-icon-div'><SearchIcon style={{color: "white", cursor: "pointer"}}/></div>
        </div>
        <h4>My contacts</h4>
        <div className='contact-div'>
            {
                returnSearched(myContacts).map((contacts)=>(
                    <div key={contacts._id} className="contact-wrapper">
                        <div className='profile-pix'>
                            <Avatar/>
                        </div>
                        <div className='profile-name'>
                            <h5>{contacts.username}</h5>
                            <p>{contacts.email}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </Container>
  )
}

export default Contacts