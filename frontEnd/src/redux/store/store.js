import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../slicer/itemsSlicer.js';
import categoryReducer from '../slicer/categorySlicer.js';
import tableSlicer from '../slicer/tableSlicer.js';
import bookingSlicer from '../slicer/bookingSlicer.js';
import cartSlicer from '../slicer/cartSlicer.js';
import orderSlicer from '../slicer/orderSlicer.js';

 const store = configureStore({
    reducer:{
        items:itemReducer,
        categorys:categoryReducer,
        tables:tableSlicer,
        bookings:bookingSlicer,
        carts:cartSlicer,
        orders:orderSlicer
    },
});

export default store;