import {createSlice} from '@reduxjs/toolkit'



export const alertSlice = createSlice({
    name:"alerts",
    initialState:{
        loader : false,
    },
    reducers:{
        showloading:( state)=> {
            state.loader = true
        },
        hideloading :(state)=>{
            state.loader = false
        }
    }
})
export const { showloading , hideloading} = alertSlice.actions