import mongoose from '../connect.js';


const categorySchema = new mongoose.Schema({
    categoryName:{
        required:true,
        unique:true,
        type:String
    }
},{
    timestamps:true
})

const Category = mongoose.model('category',categorySchema);

export default Category;