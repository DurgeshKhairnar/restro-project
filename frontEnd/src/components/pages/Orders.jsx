import Search from '../Search.jsx';
import {useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { updateCart } from '../../redux/slicer/cartSlicer.js';
import { fetchOrder , CheckInOrder } from '../../API/orders.js';
import { getOrder } from '../../redux/slicer/orderSlicer.js';

function Orders(){

     const orderList = useSelector(state => state.orders.order);
     const dispatch = useDispatch();
      console.log(orderList);
      let navigate = useNavigate();


    async function loadData(){
        const data = await fetchOrder();
        dispatch(getOrder(data));
    }

    useEffect(() =>{
        loadData();
    },[])


      const handlClick = (index) => {
         navigate('/',{
            state :{
                isEdited :true,
                orderId: orderList[index]._id
            }
         })
         dispatch(updateCart(orderList[index].itemList));
      }

      const handleCheckIn = async(id) => {
         const response =  await CheckInOrder(id);
         if(response.ok){
            loadData();
         }
      }

    return(
        <div className='flex flex-col justify-start items-start min-h-screen bg-gray-100 w-full p-2'>
            <Search />
            <h1 className='my-1 font-bold'>Orders</h1>
            <div className='flex flex-wrap'>
            {
                orderList?.map((item,index) => (
                             
        <div key={item?.orderId} className='w-80  bg-white p-3 flex 
                    flex-col justify-around rounded-[5px] m-1 border-2 border-gray-200'>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>OrderId : <span className='font-bold'>{item?.orderId}</span></p>
                            <p className='font-semibold mb-2'>T14</p>
                        </div>

                        {
                            item?.itemList?.map((items,index) => (
                                
                                <div key={index} className='flex flex-col'>
                                    <div className='flex  justify-between '>
                                        <p className='text-gray-500'>{items.productName}</p>
                                        <p>{items.count}</p>
                                        <p>{items.price}</p>
                                    </div>
                                </div>       
                            
                            ))
                        }
                        <div className='flex justify-between my-2'>
                            <h1 className='font-bold'>Total Amount</h1>
                            <h2 className='font-bold'>{item?.totalAmount}</h2>
                        </div>
                        <div className='flex items-center justify-evenly'>
                              <button 
                             onClick={() => handleCheckIn(item._id)}
                            className={`h-10 w-full border-2 ${item?.status == 'process' ? 'border-green-500' : 'border-amber-500'} ${item?.status == 'process' ? 'text-green-500' : 'text-amber-500'} font-bold rounded-[5px] mt-2 cursor-pointer m-1`}>{item?.status}</button>
                            <button 
                            disabled={item?.status == 'check-In'}
                            onClick={() => handlClick(index)}
                            className='cursor-pointer p-2 bg-blue-500 rounded-[5px] m-1'><i className="ri-pencil-line text-white"></i></button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
}


export default Orders;