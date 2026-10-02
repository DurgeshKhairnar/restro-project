import Orders from '../db/orderSchema.js';


export const createOrders = async(req,res) => {
    try{
        
        const { orderId , totalAmount , itemList } = req.body;

        if(!orderId?.trim()){
            return res.status(400).json({success:false,message:'order Id is required'});
        }

        if(totalAmount == undefined || totalAmount == null || totalAmount <= 0){
            return res.status(400).json({success:false,message:'totalAmount is required'})
        }

        if(!Array.isArray(itemList) || itemList.length === 0){
            return res.status(400).json({success:false,message:'itemList is required'});
        }
        const order = await Orders.create({
            userId:req.user._id,
            orderId, 
            totalAmount, 
            itemList
        })
        return res.status(201).json({success:true,message:'Order is successfully created',data:order})
    }catch (e){
        return res.status(200).json({success:false,message:`Error : ${e.message}`})
    }
}


export const getOrders = async(req,res) => {
    try{
        
        const order = await Orders.find({userId:req.user._id});

        return res.status(200).json({success:true,message:'Order get successfully',data:order})
    }catch (e){
        return res.status(200).json({success:false,message:`Error : ${e.message}`})
    }
}