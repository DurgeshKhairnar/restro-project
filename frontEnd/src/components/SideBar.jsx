import { NavLink , Link} from 'react-router-dom';
function SideBar(){
    return (
        <>
            <div className='min-h-screen w-50 p-1   flex flex-col items-center'>
                <h2 className='mb-3 font-bold'><i className="ri-restaurant-line"></i> Pos-System</h2>
                <div className='h-70 w-47 p-2 flex flex-col  justify-evenly'>
                    <NavLink to='/' className={({isActive}) =>
                    isActive ? 'text-white bg-amber-500 p-3  font-semibold ': 'text-black font-semibold p-3'}><i className="ri-restaurant-2-line"></i>  Dashboard</NavLink>

                    <NavLink to='/tables' className={({isActive}) =>
                    isActive ? 'text-white bg-amber-500 p-3  font-semibold ': 'text-black font-semibold p-3'}><i className="ri-table-line"></i> Tables</NavLink>

                    <NavLink to='/orders' className={({isActive}) =>
                    isActive ?  'text-white bg-amber-500 p-3  font-semibold ': 'text-black font-semibold p-3'}><i className="ri-list-ordered"></i> Orders</NavLink>

                    <NavLink to='/inventory' className={({isActive}) =>
                    isActive ?  'text-white bg-amber-500 p-3  font-semibold ': 'text-black font-semibold p-3'}><i className="ri-file-list-line"></i> Inventory</NavLink>

                    <NavLink to='/booking' className={({isActive}) =>
                    isActive ?  'text-white bg-amber-500 p-3  font-semibold ': 'text-black font-semibold p-3'}><i className="ri-git-repository-commits-line"></i> Booking</NavLink>

                    <NavLink to='/o' className={({isActive}) =>
                    isActive ?  'text-white bg-amber-500 p-3  font-semibold ': 'text-black font-semibold p-3'}><i className="ri-file-chart-line"></i> Reports</NavLink>

                    <NavLink to='/setting' className={({isActive}) =>
                    isActive ?  'text-white bg-amber-500 p-3  font-semibold ': 'text-black font-semibold p-3'}><i className="ri-tools-line"></i> Setting</NavLink>
                </div>
            </div>
        </>
    )
}

export default SideBar;