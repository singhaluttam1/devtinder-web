import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const requestSlice= createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests: (state, action) => action.payload,
        removeRequest: (state,action) =>{
            const newArray=state.filter((request)=>request._id!==action.payload._id)
            return newArray
        } 
    }
})
export const {addRequests,removeRequest} = requestSlice.actions;
export default requestSlice.reducer
