import { useState , useEffect } from 'react';
import { getBooking } from '../../redux/slicer/bookingSlicer.js';
import { useDispatch , useSelector } from 'react-redux';
import { fetchBookings } from '../../API/tableBooking.js';


function Booking(){
    const bookings = useSelector(state => state.bookings.booking);
    const dispatch = useDispatch();

    async function loadData(){
      const response =  await fetchBookings();
      dispatch(getBooking(response.data))
    }

    useEffect(() => {
        loadData();
    },[])

    return (
        <div className=''>
            <h1 className='font-bold text-2xl mt-4'>All Table Booking</h1>
            <h4 className='text-gray-500'>Manage and view all table reservation</h4>
             <div className='w-240 mx-9 h-12 mt-5  bg-gray-100 flex items-center justify-evenly'>
                <input type='date' className='h-8 w-40 border-2 border-gray-200 rounded-[5px] p-1 focus:border-amber-500 focus:outline-none' placeholder='from'/>
                 <input type='date' className='h-8 w-40 border-2 border-gray-200 rounded-[5px] p-1 focus:border-amber-500 focus:outline-none' placeholder='from'/>
                 <select className='h-8 w-30 border-2 border-gray-200 rounded-[5px] p-1 focus:border-amber-500 focus:outline-none'>
                    <option >All Status</option>
                 </select>
                 <select className='h-8 w-30 border-2 border-gray-200 rounded-[5px] p-1 focus:border-amber-500 focus:outline-none'>
                    <option >All Table</option>
                 </select>
            </div>
            <table>
                 <thead className='w-240 mx-9 h-12 mt-5  bg-gray-100 flex items-center justify-between'>
                    <tr className='w-full p-1 flex items-center justify-between'>
                          <th >#</th>
                        <th >Customer</th>
                        <th >Phone</th>
                        <th >Table</th>
                        <th >Date</th>
                        <th >Time</th>
                        <th >Guests</th>
                        <th >Status</th>
                        <th >Action</th>
                    </tr>
                 </thead>
                 <tbody>
                        {
                            bookings?.map((booking,index) => (
                                <tr key={index} className='w-240 mx-9 bg-white flex items-center justify-between p-1'>
                                  <td >{index+1}</td>
                                  <td >{booking.customerName}</td>
                                  <td >{booking.mobileNumber}</td>
                                  <td >{booking.tableNo}</td>
                                  <td >{booking.date}</td>
                                  <td >{booking.startingTime} : {booking.endingTime}</td>
                                  <td >{booking.guest}</td>
                                  <td >{booking.status}</td>
                                   <td><i className="ri-pencil-line"></i></td>
                                </tr>
                               
                            ))
                        }
              
                 </tbody>
            </table>
        </div>
    );
}

export default Booking;