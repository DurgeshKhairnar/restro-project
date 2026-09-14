import Category from '../db/categorySchema.js';

const addCategory = async(req,res) => {
    try{

        console.log(req.body.categoryName)
        const { categoryName } = req.body;

        console.log(`category ${categoryName}`)
        console.log(`id ${req.user._id}`)
        console.log(`category ${req.body}`)

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
        res.status(404).json({message:`${e.message}`})
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

export default {addCategory , getAllCategory };





