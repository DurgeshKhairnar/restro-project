import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    booking : []
}

const bookingSlicer = createSlice({
    name:'booking',
    initialState,
    reducers:{
        getBooking : (state,action) => {
            state.booking = action.payload;
        }
    }
});


export const { getBooking } = bookingSlicer.actions;

export default bookingSlicer.reducer;