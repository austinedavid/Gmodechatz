import React, {useState, useEffect}from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'




// below is our styles for the jsx
const Container = styled.div`
    width: 400px;
    color: white;

    @media(max-width: 430px){
      width: 300px;
    }
    @media(max-width: 290px){
      width: 250px;
    }

    .top-div{
      margin-bottom: 10px;
      font-size: 30px;
      font-weight: bold;

      @media(max-width: 430px){
      font-size: 20px;
      }
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

        .loading-container{
          width: 100%;
          height: 0.8rem;
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          align-items: center;

          .loading{
            width: ${(prop)=> prop.loading+"%"};
            height: 0.5rem;
            background-color: red;
            border-radius: 5px;
          }

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
  const[profileImg, setprofileImg] = useState('')
  const[imgUrl, setimgUrl] = useState('')
  const[loading, setloading] = useState(null)
  const uploadToGoogle = ()=>{
    const storage = getStorage(app)
    const filename = new Date().getTime() + profileImg.name
    const storageRef = ref(storage, filename)

    const uploadTask = uploadBytesResumable(storageRef, profileImg);
    uploadTask.on('state_changed', 
  (snapshot) => {
   
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setloading(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      
      setinfos({...infos, profileUrl:downloadURL})
    });
  }
);

  }

  console.log(imgUrl)

  // here we create a useeffect that can handle auto upload to firebase immediatly there is change
  useEffect(()=>{
    profileImg && uploadToGoogle()
  },[profileImg])

  return (
    <Container loading={loading}>
      <div className='top-div'>
        <h4>You are almost there,</h4>
        <h4>this is the last part of the form</h4>
      </div>
      <div className='input-div'>
        <input placeholder='username' type="text" ref={userRef} value={infos.username}  onChange={(e)=>setinfos({...infos, username: e.target.value})}/>
       
        <div className='profile-pix' >
          <label>upload profile picture<span>*</span></label>
          {
            loading >= 1? (<div className='loading-container'>
              <div className='loading'></div>
            </div>):
            (<input accept='image'  type='file' className='file-input' onChange={(e)=> setprofileImg(e.target.files[0])}/>)
          }
          
        </div>
        
      </div>
     
    </Container>
  )
}

export default Review