import React, {useState}from 'react'
import styled from 'styled-components'




// below is our styles for the jsx
const Container = styled.div`
    width: 400px;
    color: white;

    .top-div{
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: bold;
    }
    .input-div{
      display: flex;
      flex-direction: column;

      .profile-pix{
        display: flex;
        flex-direction: column;

        .file-input{
          width: 50%;
        }
        span{
          color: red;
        }
      }

      input{
        height: 2.6rem;
        margin-bottom: 20px;
        padding: 0 10px;
      }
    }
`

// our jsx.
const Review = ({setpage, userRef, page, setinfos, infos}) => {
  return (
    <Container>
      <div className='top-div'>
        <h4>You are almost there,</h4>
        <h4>this is the last part of the form</h4>
      </div>
      <div className='input-div'>
        <input ref={userRef} placeholder='enter username' value={infos.username} onChange={(e)=>setinfos({...infos, username: e.target.value})}/>
        <div className='profile-pix' >
          <label>upload profile picture<span>*</span></label>
          <input  type='file' className='file-input'/>
        </div>
        
      </div>
     
    </Container>
  )
}

export default Review