import mongoose from '../connect.js';


const categorySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    categoryName:{
        required:true,
        unique:true,
        type:String
    }
},{
    timestamps:true
})

const Category = mongoose.model('Category',categorySchema);

export default Category;