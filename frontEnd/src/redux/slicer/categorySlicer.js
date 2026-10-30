import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    category : []
}


export const categorySlicer = createSlice({
    name:'category',
    initialState,
    reducers:{
        addCategory : (state,action) => {
                state.category.push(action.payload)
        },
        getCategory :(state,action) => {
            state.category = action.payload;
        }
    }
})

export const { addCategory , getCategory } = categorySlicer.actions;
export default categorySlicer.reducer;


