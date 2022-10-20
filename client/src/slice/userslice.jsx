import {createSlice} from "@reduxjs/toolkit"

// creating initial state for the user
const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

// creating the slice
const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setloading: (state, action)=>{
            state.loading = true
        },
        signedUser: (state, action)=>{
            
            state.currentUser = action.payload;
            state.loading = false
        },
        checkerror: (state, action)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = true

        },
        signoutUser: (state, action)=>{
            state.currentUser = null
        }
    }
})

export const{signedUser, signoutUser, setloading, checkerror} = userSlice.actions
export default userSlice.reducer