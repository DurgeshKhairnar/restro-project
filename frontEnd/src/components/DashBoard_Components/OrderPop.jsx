import { useDispatch , useSelector } from 'react-redux';
import { addOrder } from '../../redux/slicer/orderSlicer.js';
import { clearCart , updateCart } from '../../redux/slicer/cartSlicer.js';
import { createOrder , updateOrder } from '../../API/orders.js';


function OrderPop(props){

    const dispatch = useDispatch()

    const orderId = Date.now();
    function totalAmountFun(){
        return props.orderList?.reduce((total,itm) => (total += itm.price * itm.count),0)
    }
    let totalCount =  totalAmountFun();

   async function addOrderList(){
     const newList = {orderId:orderId.toString(),itemList:props.orderList,totalAmount:totalCount,status:'process'}
         if(props.isEdited){
             await updateOrder(newList,props.orderId);
        }else{
            
             dispatch(addOrder(newList));
             await createOrder(newList);
        }
        dispatch(clearCart());
        props.onClose()
    }

    return (
         <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
                <div className='w-100  bg-white p-3 flex flex-col justify-around rounded-[5px]'>
                        <div className='w-full flex items-end justify-between'>
                            <p></p>
                            <button className='cursor-pointer' onClick={props.onClose}>X</button>
                        </div>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>OrderId : <span className='font-bold'>{orderId}</span></p>
                            <p className='font-semibold mb-2'>T14</p>
                        </div>

                        {
                            props.orderList?.map((items,index) => (
                                
                                <div key={index}>
                                    <div className='flex justify-between '>
                                        <p className='text-gray-500'>{items.productName}</p>
                                        <p>{items.count}</p>
                                        <p>{items.price}</p>
                                    </div>
                                </div>       
                            
                            ))
                        }
                        <div className='flex justify-between my-2'>
                            <h1 className='font-bold'>Total Amount</h1>
                            <h2 className='font-bold'>{props.orderList?.reduce((total,itm) => (total += itm.price * itm.count),0)}</h2>
                        </div>
                        <button 
                        onClick={addOrderList}
                        className='h-10 w-full border-2 border-green-500 text-green-500 font-bold rounded-[5px] mt-2 cursor-pointer'>Proceed</button>
                </div>
          </div>
    )
}


export default OrderPop; 