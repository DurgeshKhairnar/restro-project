import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    order : []
}

const orderSlicer = createSlice({
    name:'order',
    initialState,
    reducers:{
        addOrder : (state,action) => {
            state.order.push(action.payload);
        },
        getOrder : (state,action) => {
            state.order = action.payload;
        }
    }
})

export const { addOrder  , getOrder} = orderSlicer.actions;

export default orderSlicer.reducer;