import mongoose from '../connect.js';

const orderSchema = new mongoose.Schema({
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orderId:{
        required:[true,'orderId is required'],
        type:String
    },
    totalAmount:{
        required:[true,'totalAmount is required'],
        type:Number
    },
    itemList:{
        required:[true,'items is required'],
        type:[]
    },
    status:{
        type:String,
        enum:['process','check-In'],
        default:'process'
    }
},{
    timestamps : true
})

const Orders = mongoose.model('Order',orderSchema);

export default Orders;