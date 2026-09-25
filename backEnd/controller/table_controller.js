import Table from '../db/tableSchema.js';


export const createTable = async(req,res) => {
    try{
        const {tableNo , seats , status} = req.body;

         console.log(tableNo , seats , status)
        if( tableNo === undefined || 
            seats === undefined ||
            !status?.trim()
        ){
           return res.status(400).json({success:false,message:'All fields are required'});
        }
       
        const tableCreated = await Table.create({
            userId:req.user._id,
            tableNo:tableNo,
            seats:seats,
            status: status
        });

      return res.status(201).json({success:true,
        message:'Table is created',
        data:tableCreated
    })

    }catch (e) {
        if(e.code == 11000){
           return res.status(409).json({success:false,message:'Table alreday exist'})
        }
       return res.status(500).json({success:false,message:'Internal server error'})
    }
}

export const getTables = async(req,res) => {
    try{

        const getTables = await Table.find({userId:req.user._id})

        if(!getTables){
            return res.status(404).json({success:false,message:'Tables not found'})
        }

        return res.status(200).json({success:false,data:getTables});
    }catch (e){
        return res.status(500).json({success:false,message:`internal server error ${e.message}`})
    }
}