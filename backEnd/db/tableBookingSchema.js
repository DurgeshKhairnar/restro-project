import mongoose from '../connect.js';



const tableBooking = new mongoose.Schema({
  userId:{
    required:true,
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  customerName:{
    required:true,
    type:String
  },
  mobileNumber:{
    required:true,
    type:String
  },
  date:{
     required:true,
     type:String
  },
   tableId:{
    required:true,
    type:mongoose.Schema.Types.ObjectId,
    ref:'Table'
   },
   startingTime:{
      required:true,
      type:String
   },
   endingTime:{
      required:true,
      type:String
   },
   guest:{
      required:true,
     type:String
   },
   status:{
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "PENDING"
   }  
},{
    timestamps:true
})

const TableBooking = mongoose.model('tableBooking',tableBooking);

export default TableBooking;