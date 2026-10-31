import restro_bg_image from '../../assets/restro_bg_image.jpg';
import hot_food from '../../assets/hot_food.png';
import { useState } from 'react';
import Signup from './Signup.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../../API/axios.js';
import toast , { Toaster } from 'react-hot-toast';
import ForgetPassword from './ForgetPassword.jsx';


function Login(){
    const navigate = useNavigate();
    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');

    const [isLogin , setLogin] = useState(false);
    const [isVisible , setVisible ] = useState(false);

    const [isLoading , setLoading] = useState('Login')

    const [isForget , setIsForget ] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        console.log(userName);
        console.log(password)
        login();
    }

    async function login(){
        setLoading('Loading...')
      try{
          const response = await api.post('/loginUser',{
            userName:userName,
            password:password
          });
             console.log('ssasas');
         if(response.status == 201){
            toast.success('Login Successfully')
             navigate('/')
         }

      }catch (e){
            console.log(`Error ${e.response?.data?.message}`)
             toast.error(
                   e.response?.data?.message || 'Something went wrong'
              );
      } finally {
        setLoading('Login')
      }
    }

    return (
     <>
          <Toaster/>
           <div className='flex min-h-screen'>
            <div className='w-[50%] h-screen relative'>
                <img className='w-full h-full object-cover lean' src={restro_bg_image} alt='restro_bg_image' />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                <img className='absolute top-10 left-20 h-23' src={hot_food} alt='img'/>
                <h1 className='absolute top-35 left-10 text-white text-4xl font-bold'>Restro<span className='text-amber-500'>Pos</span></h1>
                <h5 className='absolute top-44 left-10 text-gray-300'>Smart Restaurant Management</h5>
                  <h1 className='absolute text-[45px] top-55 left-10 text-white text-4xl font-bold'>Welcome<span className='text-amber-500'>Back!</span></h1>
                   <h5 className='absolute top-70 left-10 text-gray-200'>Sign in to Restro account and manage your <br/> resturant with ease.</h5>
                   <p className='absolute top-90 left-10  w-30 text-white flex justify-between items-center text-xs'><i className="ri-list-ordered text-amber-500 text-[20px] font-bold"></i>Manage Orders</p>

                    <p className='absolute top-100 left-10  w-24 text-white flex justify-between items-center text-xs'><i className="ri-phone-find-line text-amber-500 text-[20px] font-bold"></i>Track Table</p>

                    <p className='absolute top-110 left-10  w-25 text-white flex justify-between items-center text-xs'><i className="ri-file-chart-line text-amber-500 text-[20px] font-bold"></i>View Report</p>

                    <p className='absolute top-120 left-10  w-35 text-white flex justify-between items-center text-xs'><i className="ri-bar-chart-line text-amber-500 text-[20px] font-bold"></i>Grow Your Business</p>
            </div>
            <div className='w-[50%] h-screen flex flex-col items-start justify-evenly px-10'>
                    {
                        (isLogin) ? (<div>
                        <h1 className='text-4xl font-bold'>Login to Restro</h1>
                        <h5 className='text-gray-500 font-semibold'>
                            Enter your credentials to access your account
                        </h5>
                    </div>) : (<div>
                        <h1 className='text-4xl font-bold'>Sign up</h1>
                    </div>)
                    }
                   {
                      (isLogin) ? (
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
                        <div className='flex items-center justify-between w-120'>
                            <h1></h1>
                            <button 
                            onClick={() => setIsForget(prev => !prev)}
                            type='button'
                            className='text-amber-500 cursor-pointer'>Forget password?</button>
                        </div>
                        <button type='submit'
                         className='w-120 h-13 bg-amber-500 rounded-[5px] flex justify-center items-center cursor-pointer'>
                            <p className='text-white font-semibold'>{isLoading}</p>
                        </button>
                    </form>
                      ) : (<Signup/>)
                   }
                 <div className='flex items-center justify-center w-120'> 
                    <p className='text-gray-500 text-sm'>or continue with</p>
                 </div>
                 <div>
                         <div className='w-120 h-12 border-gray-200 border rounded-[5px] flex justify-center items-center'>
                                <p className='font-semibold'>Continue with Gmail</p>
                         </div>
                 </div>
                  {
                    (isLogin) ? (<div className='flex items-center justify-center w-120'> 
                    <p className='text-gray-500 text-sm'>Don't have an account? <span 
                    onClick={() =>setLogin((p) => !p)}
                    className='text-amber-500 cursor-pointer'>Sign up</span></p>
                 </div>): (
                    <div className='flex items-center justify-center w-120'> 
                    <p className='text-gray-500 text-sm'>Already you have an account? <span 
                    onClick={() =>setLogin((p) => !p)}
                    className='text-amber-500 cursor-pointer'>Login</span></p>
                 </div>
                 )
                  }
            </div>
            {(isForget) ? <ForgetPassword onClose={() => setIsForget(prev => !prev)}/> : <></> }
        </div>
     </>
    )
}

export default Login;