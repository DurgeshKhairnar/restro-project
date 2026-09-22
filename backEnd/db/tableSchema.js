import mongoose from '../connect.js';


const tableSchema = new mongoose.Schema({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      tableNo : {
           type:Number,
           required:true,
           unique:true
      },
      seats:{
           type:Number,
           required:true,
           unique:true
      },
      status:{
        type:String,
        enum:['AVAILABLE','BOOKED'],
        default:'AVAILABLE'
      }
},{
    timestamps:true
})

const Table = mongoose.model('table',tableSchema);

export default Table;