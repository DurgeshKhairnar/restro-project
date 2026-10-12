import Orders from '../db/orderSchema.js';


export const createOrders = async(req,res) => {
    try{
        
        const { orderId , totalAmount , itemList , status } = req.body;

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
            itemList,
            status
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


export const checkInOrder = async(req,res) => {
    try{

        const { id } = req.params;
        const { status } = req.body;

        if( id == '' || id === undefined || id === null){
            return res.status(404).json({success:false,
                message:'id is not found',     
            })
        }

        if(!status.trim()){
            return res.status(404).json({success:false,
                message:'status is not found',     
            })
        }
    
        const checkInOrder  = await Orders.findByIdAndUpdate(id,
            {
                status : status
            },
            { 
                returnDocument: "after",
                runValidators:true
             }
        )
        if(!checkInOrder){
                    return res.status(404).json({
                        success:false,
                        message:'Order Not found',
                    })
        }

        return res.status(201).json({success:true,data:checkInOrder,message:'Order Update Successfully'})

    }catch (e){
        return res.status(200).json({success:false,message:`Error : ${e.message}`})
    }
}

export const updateOrders = async(req,res) => {
    try{

        const { id } = req.params;
        console.log(id);
        const updateOrder = await Orders.findByIdAndUpdate(id,
            {
                $set : req.body
            },{
                returnDocument:'after',
                runValidators:true
            }
        )

        if(!updateOrder){
            return res.status(404).json({success:false,message:'order not found',data:updateOrder});
        }

         return res.status(201).json({success:true,message:'order update successfull',data:updateOrder});

    }catch (e){
         return res.status(200).json({success:false,message:`Error : ${e.message}`})
    }
}