import { useNavigate } from 'react-router-dom';
import Login from '../pages/login.jsx';

function Setting(){

    const navigate = useNavigate();
    return (
        <div className='w-full p-1'>
            <h1 className='font-bold'>Setting</h1>
            <button 
            onClick={()=>{
                   navigate('/login')
            }}
            className='font-bold bg-red-500 text-white font-bold h-7 w-20 cursor-pointer'>Log Out</button>
        </div>
    )
}


export default Setting;