import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast , { Toaster } from 'react-hot-toast';


function ForgetPassword({onClose}){
 
    const navigate = useNavigate();
    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');

    const [isLogin , setLogin] = useState(false);
    const [isVisible , setVisible ] = useState(false);

    const [isLoading , setLoading] = useState('Forget Password')

    function handleSubmit(e){
        e.preventDefault();
        console.log(userName);
        console.log(password)
        if(password !== confirmPassword){
                toast.error('check your password')
        }
    }
    return (
        <div className='inset-0 fixed bg-black/50 flex items-center justify-center'>
                <div className='bg-white w-150 flex flex-col items-center justify-center rounded-[10px]'>
                       <div className='w-full min-h-min px-2 py-2'>
                        <div className='flex justify-between'>
                              <h1 className='text-xl font-bold'>Forget Password</h1>
                              <button className='cursor-pointer' type='button' onClick={onClose}>X</button>  
                        </div>
                        <h5 className='text-gray-500 text-xl font-semibold'>
                            Enter your new password to access your account
                        </h5></div>     
                       <form onSubmit={handleSubmit} className='p-1 h-80 flex flex-col justify-evenly'>
                    <div>
                            <p className='font-semibold'>Email Address</p>
                            <div className='flex items-center focus-within:border-amber-500 border-2 border-gray-200  p-1 w-120 h-10'>
                                <i className="ri-mail-line"></i>
                                <input 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className='w-full h-full p-2 outline-none ' type='text' placeholder='Enter Your Email' />
                            </div>
                     </div>
                     <div>
                                <p className='font-semibold'>Password</p>
                                <div className='flex items-center border-2 focus-within:border-amber-500 border-gray-200 p-1 w-120 h-10'>
                                    <i className="ri-lock-line"></i>
                                    <input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full h-full p-2 outline-none ' type={(isVisible) ? 'text' : 'password'} placeholder='Enter Your Password' />
                                     <button
  type="button"
  onClick={() => setVisible(prev => !prev)}
>
  {isVisible
    ? <i className="ri-eye-line"></i>
    : <i className="ri-eye-off-line"></i>
  }
</button>
                                </div>
                     </div>
                     <div>
                                <p className='font-semibold'>Confirm Password</p>
                                <div className='flex items-center border-2 focus-within:border-amber-500 border-gray-200 p-1 w-120 h-10'>
                                    <i className="ri-lock-line"></i>
                                    <input 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full h-full p-2 outline-none ' type={(isVisible) ? 'text' : 'password'} placeholder='Enter Your confirm Password' />
                                     <button
  type="button"
  onClick={() => setVisible(prev => !prev)}
>
  {isVisible
    ? <i className="ri-eye-line"></i>
    : <i className="ri-eye-off-line"></i>
  }
</button>
                                </div>
                     </div>
                      
                        <button type='submit'
                         className='w-120 h-13 bg-amber-500 rounded-[5px] flex justify-center items-center cursor-pointer'>
                            <p className='text-white font-semibold'>{isLoading}</p>
                        </button>
                    </form>
                </div>
        </div>
    )
}


export default ForgetPassword;