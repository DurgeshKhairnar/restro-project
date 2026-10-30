
function Table({ tableNo }){
    return (
        <div className='w-23 h-23 p-1  bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center m-1
                hover:border-amber-500'>
                    <div className='bg-gray-200 h-2 w-10 rounded-xl'></div>
                        <div className='flex items-center justify-center'>
                          <div className='bg-gray-200 h-10 w-2 rounded-xl'></div>
                          <div className='bg-gray-200 h-15 w-15 rounded-xl m-1 flex justify-center items-center'>{tableNo}</div>
                          <div className='bg-gray-200 h-10 w-2 rounded-xl'></div>
                        </div>
                    <div className='bg-gray-200 h-2 w-10 rounded-xl'></div>          
         </div> 
    )
}

export default Table;