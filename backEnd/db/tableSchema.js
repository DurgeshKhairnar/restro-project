import mongoose from '../connect.js';


const tableSchema = new mongoose.Schema({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      tableNo : {
           type:String,
           required:true,
      },
      seats:{
           type:String,
           required:true,
      },
      status:{
        type:String,
        enum:['AVAILABLE','BOOKED'],
        default:'AVAILABLE'
      }
},{
    timestamps:true
})

const Table = mongoose.model('Table',tableSchema);

export default Table;