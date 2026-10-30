import { useState } from 'react';
import toast , { Toaster } from 'react-hot-toast';
import api from '../../API/axios.js';

function Signup(){

     const [userName , setUserName] = useState('');
     const [password , setPassword] = useState('');

     const [isLoading , setLoading] = useState('Sign up')

     const [isVisible , setVisible ] = useState(false);

      function handleSubmit(e){
        e.preventDefault();
        console.log(userName);
        console.log(password)
        Signin();
    }

      async function Signin(){
        setLoading('Loading...')
        try{
             const response = await api.post('/registerUser',
                {userName:userName , password:password}
             )
                if(response.status == 201){
                    toast.success('Sign up  Successfully')
                    setUserName('');
                    setPassword('');
                }
        }catch (e){
            console.log('error:',e.message);
              toast.error(
                   e.response?.data?.message || 'Something went wrong'
              );  
        }finally {
            setLoading('Sign up')
        }
    }

    return (
         <>
            <Toaster/>
             <form onSubmit={handleSubmit} className='p-1 h-60 flex flex-col justify-evenly'>
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
                      
                        <button type='submit' className='w-120 h-13 bg-amber-500 rounded-[5px] flex justify-center items-center cursor-pointer'>
                            <p className='text-white font-semibold'>{isLoading}</p>
                        </button>
             </form>
         </>
    )
}

export default Signup;