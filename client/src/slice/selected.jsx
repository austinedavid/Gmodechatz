import {createSlice} from '@reduxjs/toolkit'

// creating the initial state
const initialState = {
    friend: null
}

const friendSlice = createSlice({
    name: "friends",
    initialState,
    reducers:{
        updateFriends: (state, action)=>{
            state.friend = action.payload
        }
    }
})

export const {updateFriends} = friendSlice.actions
export default  friendSlice.reducer