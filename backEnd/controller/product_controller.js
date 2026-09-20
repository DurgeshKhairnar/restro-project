import Product from '../db/productSchema.js';
import Category from '../db/categorySchema.js';


export const addProduct = async(req,res) =>{
    try{

        console.log(req.body)
        const { productImage , productName , categoryName , price } = req.body;

        if([productImage , productName , categoryName , price].some(items => items?.trim() === '')){
            return res.status(400).json({message:'all fields are required'})
        }

        const category = await Category.findOne({categoryName:categoryName?.trim()});

        console.log(`category ${category}`)
        if(!category){
            return res.status(404).json({message:'category not found'});
        }

       const product = await Product.create({
            userId:req.user._id,
            productImage,
            productName,
            categoryId:category._id,
            price
        })

        console.log(`product ${product}`)
        return res.status(201)
        .json({
            success:true,
            message:'Add product successfully',
            data:{
                ...product.toObject(),
                categoryName: category.categoryName
            }
        })

     }catch (e){
        console.log(`add product ${e.message}`)
        if(e.code === 11000){
            return res.status(409)
            .json({
                success:false,
                message:'Product already exists'
            })
        }
         return res.status(404).json({message:`${e.message}`})
    }
} 

export const getProduct = async(req,res) => {
    try{

            const product = await Product.find({userId:req.user._id}).populate('categoryId' , 'categoryName').select('-__v');

            const response = product.map((item) => ({
                   _id: item._id,
                    productImage: item.productImage,
                    productName: item.productName,
                    categoryName: item.categoryId?.categoryName,
                    price: item.price,
            }));

            return res.status(200).json({
                success:true,
                message:'get all categorys',
                data:response,
            })
        
    }catch (e){
          return res.status(404).json({message:`${e.message}`})
    }
}

export const updateProduct = async(req,res) =>{
    try{

        const { id }  = req.params;

        if(!id){
            return res.status(404).json({success:false,message:"id not found"});
        }

        const updateProduct = await Product.findByIdAndUpdate(
            id,{
                $set : req.body,
            },{
                returnDocument: "after",
                runValidators:true
            }
        );

        if(!updateProduct){
            return res.status(404).json({
                success:false,
                message:'Product Not found',
            })
        }

        return res.status(201).json({success:true,data:updateProduct,message:'Product Update Successfully'})

    }catch (e){
        console.log(`error in updateProduct ${e.message}`)
        return res.status(500).json({message:'Internal Server Error'})
    }
}


export const deleteProduct = async(req,res) => {
    try{

        const { id } = req.params;

        if(!id){
            return res.status(404).json({success:false,message:'Id not found'})
        }

        const deleteProduct = await Product.findByIdAndDelete(id);

        return res.status(200)
        .json({
            success:true,
            message:'Product delete successfully',
            data:deleteProduct
        })

    }catch (e){
        return res.status(500).json({success:false,message:'Interanl server error'})
    }
}