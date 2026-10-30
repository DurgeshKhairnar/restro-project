import { addTables , getTables } from '../../../redux/slicer/tableSlicer.js';
import { fetchTables , postTables } from '../../../API/tables.js';
import { useDispatch , useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
import Table from '../../Table.jsx';

function AddTables(){
    const dispatch = useDispatch();
    async function loadData(){
        try{
          const data = await fetchTables();
          dispatch(getTables(data));
        }catch (e){
            console.log(`error in loadtables ${e.message}`)
        }
    }

    useEffect(() => {
        loadData();
    },[dispatch])

    return (
        <div className='flex flex-row gap-5 w-full'>
            <div className='flex-1'>
                 <Tableform /> 
            </div>
            <div className='flex-1'>
                  <Tables />
            </div>
        </div>
    )
}

function Tableform(){

    const dispatch = useDispatch();

    const [tableNo , setTableNo] = useState('');
    const [seats , setSeats] = useState(0);
    const [status , setStatus] = useState('');

    async function addMyTable(tableData){
        await postTables(tableData);
    }

    function handleSubmit(e){
      e.preventDefault();
      
      const tables = {
                tableNo : tableNo,
                seats : seats,
                status: status
      }
      dispatch(addTables(tables))
      addMyTable(tables);
    }

    return (
        <div className='flex h-100  bg-white rounded-[5px] p-1 m-1'>
            <form 
            onSubmit={handleSubmit}
            className='flex flex-col justify-evenly p-1 w-100'>
                <div>
                    <h1 className='font-bold text-2xl'>Add Tables</h1>
                    <p className='text-gray-500 text-[14px] font-bold'>Add Tables</p>
                </div>
                <div>
                    <p className='font-bold'>Table No</p>
                    <input 
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className='border-2 border-gray-400 w-full h-8 focus:border-amber-500 focus:outline-none p-1 ' />
                </div>
                 <div>
                    <p className='font-bold'>Seats</p>
                    <input 
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className='border-2 border-gray-400 w-full h-8 focus:border-amber-500 focus:outline-none p-1 ' />
                </div>
                 <div>
                    <p className='font-bold'>Status</p>
                    <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='w-full h-8 p-1 rounded-[3px] border-2 border-gray-400 focus:border-orange-500 focus:outline-none'>
                        <option >select status</option>
                        <option value='AVAILABLE'>AVAILABLE</option>
                        <option value='BOOKED'>BOOKED</option>
                    </select>
                </div>
                <button 
                type='submit'
                className='text-white bg-amber-500 h-10 font-bold cursor-pointer'>Add Table</button>
            </form>
        </div>
    )
}

function Tables(){
      const tables = useSelector(state => state.tables.table);
    return (
         <div className='flex flex-col h-100 w-100 bg-white rounded-[5px] p-2'>
                <div>
                    <h1 className='font-bold text-2xl'>View Tables {tables.length}</h1>
                </div>
                <div className='flex flex-wrap p-1'>
                 {
                    tables?.map((items,index) => (
                        <div key={index}>
                             <Table tableNo={items.tableNo} />
                        </div>
                    ))
                }
                </div>
        </div>
    )
}

export default AddTables;