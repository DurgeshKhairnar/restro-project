import { useState , useEffect } from 'react';
// import { useItems } from '../context/contextCartItems.js';
import toast , {Toaster} from 'react-hot-toast';

function CategoryPop({onClose}){

    const [categoryName, setCategoryName ] = useState('');
    //  const { category , setCategory } = useItems();

    const [isLoading, setLoading ] = useState('Add Category');

  

    async function addCategory(){
        try{
            setLoading('Loading...')
             const response =  await fetch('http://localhost:3000/api/addcategory',
                            {
                                method:'POST',
                                credentials:'include',
                                headers:{
                                    'Content-Type':'application/json'
                                },
                                body:JSON.stringify({categoryName: categoryName.toLocaleLowerCase()})
                            }
                        )
                   const jsonResponse =  await response.json();
                   if(response.ok){
                      toast.success('Successfully Add Category Name')
                      setCategoryName('');
                      getCaregory();
                   }else{
                        toast.error(`Error ${jsonResponse.message}`)
                   }

        }catch (e){
            toast.error(`Error ${e.message}`)
        } finally {
             setLoading('Add Category')
        }
    }

    async function getCaregory(){
        try{

                 const response = await fetch('http://localhost:3000/api/getAllcategory',
                        {
                            method:'GET',
                            credentials:'include',
                            headers:{
                               'Content-Type':'application/json' 
                            }
                        }
                    )
                const jsonResponse = await response.json();
                console.log(jsonResponse.data)
                if(response.ok){
                    setCategory(jsonResponse.data);
                } else {
                    toast.error(jsonResponse.message || 'Failed to get categories');
                }
                    

        }catch (e){
            console.log(`error getcategory ${e.message}`)
        }
    }

    return (
        <>
         <Toaster />
            <div className='fixed inset-0 z-50 w-full min-h-screen bg-black/50 flex justify-center items-center '>
                    <div className='w-100 p-2 h-40  flex flex-col  justify-between bg-white rounded-[5px]'>
                        <div className='flex justify-between '>
                            <p className='font-bold'>Add Category</p>
                            <button 
                            onClick={onClose}
                            className=' cursor-pointer'>
                                X
                            </button>
                        </div>
                        <div>
                            <p className='font-bold text-[12px] m-1'>Category1 Name</p>
                            <input 
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className='w-full border-2 rounded-[5px] p-1 border-gray-500 focus:border-amber-500 focus:outline-none'
                            type='text' placeholder='Add Category Name' />
                        </div>
                        <button 
                        onClick={addCategory}
                        className='w-full h-10 flex justify-center items-center bg-amber-500 text-white font-bold rounded-[5px] cursor-pointer'>
                            {isLoading}
                        </button>
                    </div>
            </div>
        </>
    )
}

export default CategoryPop;