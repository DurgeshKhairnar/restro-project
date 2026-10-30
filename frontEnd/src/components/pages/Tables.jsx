import Search from '../Search.jsx';
import { useDispatch , useSelector } from 'react-redux';
import { useState , useEffect} from 'react';
import {  createTableBooking } from '../../API/tableBooking.js';
import Table from '../Table.jsx';

    function Tables(){

        const tables = useSelector(state => state.tables.table);

        const [customerInfo , setCustomerInfo] = useState({
            customerName:'',
            mobileNumber:'',
            date:'',
            startingTime:'',
            endingTime:'',
            guest:'',
            tableNo:'',
            status:''
        })

        const handleChange = (e) => {
            const { name , value } = e.target;

            setCustomerInfo((prev) => ({
                ...prev,
                [name] : value
            }));
        }

        async function handleSubmit(e){
            e.preventDefault();
            console.log(customerInfo)
            await createTableBooking(customerInfo);
        }

        return(
            <div className='flex flex-col justify-start items-start min-h-screen w-full bg-gray-50 p-2'>
                <Search />
                <h1 className='mt-1 font-bold text-2xl'>Tables Booking</h1>
                <p className='text-gray-500 text-[13px]'>Reserv your table and enjoy a great dining experience!</p>
              <div className='flex w-full mt-3 justify-evenly'>
                 <form onSubmit={handleSubmit} className=' px-2 m-1 w-140 bg-white border flex flex-col border-gray-200 p-2 justify-evenly'>
                    <div className='flex flex-col m-1'>
                        <label className='font-bold'>Customer Name</label>
                        <input
                        name='customerName'
                        value={customerInfo.customerName} 
                        onChange={handleChange}
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'placeholder='Enter your name' />
                    </div>
                     <div className='flex flex-col m-1'>
                        <label className='font-bold'>Phone Number</label>
                        <input 
                        name='mobileNumber'
                        value={customerInfo.mobileNumber}
                        onChange={handleChange}
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'placeholder='Enter your phone number' />
                    </div>
                      <div className='flex flex-col m-1 w-full'>
                        <label className='font-bold'>Date</label>
                        <input
                        name='date'
                        value={customerInfo.date}
                        onChange={handleChange}
                        type='date'
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'placeholder='select date' />
                    </div>
                     <div className='flex justify-between'>
                     <div className='flex flex-col m-1 w-full'>
                        <label className='font-bold'>Statrting Time</label>
                        <input
                        name='startingTime'
                        value={customerInfo.startingTime}
                        onChange={handleChange}
                        type='time'
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'placeholder='select date' />
                    </div>
                     <div className='flex flex-col m-1 w-full'>
                        <label className='font-bold'>Ending Time</label>
                        <input
                        name='endingTime'
                        value={customerInfo.endingTime}
                        onChange={handleChange}
                        type='time'
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'placeholder='select date' />
                    </div>
                     </div>
                     <div className='flex flex-col m-1'>
                        <label className='font-bold'>Number of People</label>
                        <input 
                        name='guest'
                        value={customerInfo.guest}
                        onChange={handleChange}
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'placeholder='Number of Person' />
                    </div>
                     <div className='flex flex-col m-1'>
                        <label className='font-bold'>Table Preference</label>
                        <select 
                        name='tableNo'
                        value={customerInfo.tableNo}
                        onChange={handleChange}
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'
                        >
                            <option>select Table</option>
                          {
                            tables?.map((t,index) => (
                                <option key={index} value={t.tableNo}>{t.tableNo}</option>
                            ))
                          }
                          
                        </select>
                    </div>
                    <div className='flex flex-col m-1'>
                        <label className='font-bold'>Booking Status</label>
                         <select 
                        name='status'
                        value={customerInfo.status}
                        onChange={handleChange}
                        className='h-8 border border-gray-400 focus:border-2 focus:border-amber-500 focus:outline-none p-1'
                        >
                            <option>select status</option>
                          {
                            ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]?.map((status,index) => (
                                <option key={index} value={status}>{status}</option>
                            ))
                          }
                          
                        </select>
                    </div>
                       <button 
                       type='submit'
                       className='bg-amber-500 text-white font-bold h-10 p-2 cursor-pointer'>
                        Book Table
                        </button>
                   </form>
                   <div className='bg-white w-full m-1 border-gray-200 p-2 border'>
                    <h1 className='font-bold'>Available Tables</h1>
                    <div className='flex'>
                    {
                        tables?.map((items,index) => (
                        <div key={index}>
                             <Table tableNo={items.tableNo} />
                                </div>
                            ))
                    }
                    </div>
                   </div>
                </div>
            </div>
        );
    }


export default Tables;




