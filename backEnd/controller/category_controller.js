import Category from '../db/categorySchema.js';

const addCategory = async(req,res) => {
    try{

        console.log(req.body.categoryName)
        const { categoryName } = req.body;


        if(!categoryName){
            return res.status(401).json({message:'required category Name'})
        }

        const category = await Category.create({
            categoryName,
            userId:req.user._id
        });

        return res.status(201).json({
            message:'category name add successfully',
            data:category
        })

    }catch (e){

        if (e.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Category already exists"
            });
        }
        console.log(`add category error ${e.message}`)
       return res.status(404).json({message:`${e.message}`})
    }
}

const getAllCategory = async(req,res) => {
    try{
        
        const getAllCategores = await Category.find({userId:req.user._id});
        return res.status(200).json({data:getAllCategores});

    }catch (e){
        res.status(404).json({message:`${e.message}`})
    }
}

const updateCategory = async(req,res) => {
    try{
        const { id } = req.params;
        console.log(id)
        if(!id){
            return res.status(404).json({success:false,message:'Id not found'})
        }

        const updateCategory = await Category.findByIdAndUpdate(id,{
            $set : req.body
        },
        {
            returnDocument:'after',
            runValidators:true
        }
    );
    return res.status(200).json({success:true,message:'category successfully updated',data:updateCategory})
    }catch (e){
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}

const deleteCategory = async(req,res) => {
    try{
        const { id } = req.params;

        const deleteCategory = await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success:false,
            message:'category delete successfully',
            data:deleteCategory
        })
    }catch (e){
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}

export default {addCategory , getAllCategory , updateCategory , deleteCategory};





