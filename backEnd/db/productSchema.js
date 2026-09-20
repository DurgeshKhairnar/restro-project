import mongoose from '../connect.js';


const productSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true,
        unique:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    price:{
        type:String,
        required:true
    }
},{
    timestamps:true,
});

const Product = mongoose.model('product',productSchema);

export default Product;