import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     product : []
}

export const itemsSlice = createSlice({
    name:'item',
    initialState,
    reducers : {
        addItems : (state,action) => {
            console.log(action.payload)
           const items = {
                productImage : action.payload.productImage,
                productName: action.payload.productName,
                price:action.payload.price,
                categoryName:action.payload.categoryName
            }
            state.product.push(items);
        },
        getProduct : (state,action) => {
            state.product = action.payload;
        },
        updateProduct : (state,action) => {
            const id = action.payload._id;
             const items = {
                productImage : action.payload.productImage,
                productName: action.payload.productName,
                price:action.payload.price,
                categoryName:action.payload.categoryName
            }
            
            state.product.push(items);
        }
    }
})


export const { addItems ,getProduct , updateProduct } = itemsSlice.actions;
export default itemsSlice.reducer;