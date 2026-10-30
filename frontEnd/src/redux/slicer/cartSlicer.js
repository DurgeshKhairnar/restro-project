import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart : []
}


const cartSlicer = createSlice({
    name:'cart',
    initialState,
    reducers:{
       addItem: (state, action) => {
        const item = action.payload;

        state.cart.push({
            _id: item._id,
            productImage: item.productImage,
            productName: item.productName,
            price: item.price,
            count: 1
        });
    
     },

     incrementItem : (state,action) => {
      const item =   state.cart.find((item) => item._id == action.payload);
      if(item){
        item.count += 1;
      }
     },

     decrementItem : (state,action) => {
      const item =   state.cart.find((item) => item._id == action.payload);
      if(item && item.count > 1){
            item.count -= 1;
      }else{
        const item =  state.cart.filter((item) => item._id !== action.payload);
        state.cart = item;
      }
     },

     updateCart : (state,action) => {
            state.cart = action.payload;
     },

     clearCart : (state) => {
            state.cart = [];
     }

    }
})


export const { addItem , incrementItem ,decrementItem , clearCart , updateCart } = cartSlicer.actions;

export default cartSlicer.reducer;