import {createSlice } from '@reduxjs/toolkit';      
const feedSlice = createSlice({
  name: 'feeds',
  initialState: null,
  reducers: {
    addfeed: (state, action) => action.payload
,
    removeUserFromfeed:(state,action)=> {
        const newFeed=state.filter((user)=> user._id !==action.payload)
        return newFeed
    }
  }
});
export const { addfeed,removeUserFromfeed } = feedSlice.actions;
export default feedSlice.reducer;