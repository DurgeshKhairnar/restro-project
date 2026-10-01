import TableBooking from '../db/tableBookingSchema.js';
import Table from '../db/tableSchema.js';

export const createBooking = async(req,res) => {
    try{

        const { customerName,mobileNumber,date,tableNo,
            startingTime, endingTime, guest , status
         } = req.body;

         if([customerName,mobileNumber,date,tableNo,
            startingTime, endingTime, guest , status].some((info) => info?.trim() === '')){
                return res.status(401).json({success:false,message:'All fields are required'})
            }

            const tableId = await Table.findOne({tableNo:tableNo})
            console.log(tableId);

        console.log(req.body);
        
        const tableBooking = await TableBooking.create({
            userId:req.user._id,
            customerName,
            mobileNumber,
            date,
            tableId:tableId._id,
            startingTime,
            endingTime,
            guest,
            status
        })

         console.log(`table booking = ${tableBooking}`);
        if(!tableBooking){
            return res.status(404).json({success:false,message:'issue in booking creating'})
        }

        return res.status(201).json({success:true,message:'Table Booked successfully',data:tableBooking});
    }catch (e){
        return res.status(500).json({success:false,message:`Error : ${e.message}`})
    }
}


export const getAllBooking = async(req,res) => {
    try{
        const tableBooking = await TableBooking.find({userId:req.user._id}).populate('tableId','tableNo');

          const bookingData = tableBooking.map((booking) => ({
      _id: booking._id,
      userId: booking.userId,
      customerName: booking.customerName,
      mobileNumber: booking.mobileNumber,
      date: booking.date,
      tableNo: booking.tableId?.tableNo,
      startingTime: booking.startingTime,
      endingTime: booking.endingTime,
      guest: booking.guest,
      status: booking.status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }));

        return res.status(200).json({success:true,message:'Booking fetch successfully',data:bookingData})
    }catch (e){
        return res.status(500).json({message:`Error ${e.message}`})
    }
}