import Category from '../db/categorySchema.js';

const addCategory = async(req,res) => {
    try{

        const { categoryName } = req.body;

        console.log(`category ${req.body}`)

        if(!categoryName){
            return res.status(401).json({message:'required category Name'})
        }

        const category = await Category.create({
            categoryName
        });

        return res.status(201).json({
            message:'category name add successfully',
            data:category
        })

    }catch (e){
        console.log(`add category error ${e.message}`)
        res.status(404).json({message:`${e.message}`})
    }
}

const getAllCategory = async(req,res) => {
    try{
        
        const getAllCategores = await Category.find();
        return res.status(200).json({data:getAllCategores});

    }catch (e){
        res.status(404).json({message:`${e.message}`})
    }
}

export default {addCategory , getAllCategory };





