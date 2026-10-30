import { useState } from 'react';
import  OrderPop from '../components/DashBoard_Components/OrderPop.jsx';
import empty_orders from '../assets/empty_orders.png';
import  { useSelector , useDispatch} from 'react-redux';
import { clearCart } from '../redux/slicer/cartSlicer.js';

function Carts({isEdited , orderId }){

    const dispatch = useDispatch();
    const [isOrderPop , setOrderpPop] = useState(false);
    const carts = useSelector(state => state.carts.cart)
    
    function emptyListIcon(){
        return (
            <div className='flex p-1 flex-col items-center justify-center bg-gray-100 rounded-full h-70'>
                    <img src={empty_orders} alt='img' className='object-contain h-30 w-30'/>
                    <p className='font-bold text-gray-500 mt-1'>Empty Order List</p>
            </div>
        )
    }
    
    return (
         <div className={`min-h-screen w-90 p-2 flex flex-col ${(carts.length > 0) ? 'items-start' :'items-center'} justify-between bg-white`}>
           <div className='w-full'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-[20px]'>Invoice</p>    
                    <button 
                    onClick={() => dispatch(clearCart())}
                    className='cursor-pointer active:text-amber-500'>Clear</button>
                </div>               
                <div className='w-full p-2 h-100'>
                    {
                       (carts.length > 0) ? (carts.map((itm,idx) => (
                            <div key={idx}
                            className='w-full h-20 bg-gray-100 rounded-[5px] flex p-1 m-1 '
                            >
                            <img src={itm.productImage} alt='img' className='rounded-[5px] object-contain' />
                            <div className=' flex flex-col justify-evenly w-full bg-white p-1 rounded-[5px]'>
                                <p className='font-bold flex-wrap text-[14px]'>{itm.productName}</p>
                                <div className='flex justify-between'>
                                    <p className='font-bold text-amber-400 text-[13px]'>{itm.price}</p>
                                    <p className='font-bold text-black text-[13px]'>X</p>
                                    <p className='font-bold text-black text-[13px]'>{itm.count}</p>
                                    <p className='font-bold text-black text-[13px]'>{itm.price * itm.count}</p>
                                </div>
                            </div>   
                            </div> 
                        ))) : (emptyListIcon())
                    }
                </div>
           </div>
          <div className='flex w-full h-25 flex-col justify-between'>
            <div className='w-full h-13 flex justify-between p-1 items-center'>
                   <div className='p-1 bg-gray-200 w-23 flex items-center justify-center rounded-xl font-semibold'>Cash</div>
                   <p className='p-1 bg-gray-200 w-23 flex items-center justify-center rounded-xl font-semibold'>Card</p>
                   <p className='p-1 bg-gray-200 w-23 flex items-center justify-center rounded-xl font-semibold'>QR Code</p>
            </div>
            <button 
            onClick={()=>{
                if(carts.length > 0){
                    setOrderpPop(prev => !prev);
                }
            }}
            className=' mx-2  h-10 w-full bg-amber-500 text-white font-bold rounded-[7px] 
            '>Total : {carts.reduce((total,item) => ( total += item.count * item.price),0)}</button>
          </div>
          {(isOrderPop) ? <OrderPop onClose={() => setOrderpPop(prev => !prev)} orderList={carts} isEdited={isEdited} orderId={orderId} /> : <></> } 
        </div>
    );
}

export default Carts;