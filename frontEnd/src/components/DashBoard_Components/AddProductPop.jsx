// import { useItems } from '../../context/contextCartItems.js';
import { useState } from 'react'; 
import { addItems } from '../../redux/slicer/itemsSlicer.js';
import { useDispatch } from 'react-redux';

function AddProductPop({onClose}){

    const dispatch = useDispatch();

    // const { products, addProducts} = useItems();

    const [ productValues , addValues ] = useState({
        image:'',
        title:'',
        category:'',
        price:'',
    })

    function handleValues(e){
        const { name , value } = e.target;
        addValues(prev => ({...prev,[name]:value}));
    }   

    function handleSubmit(e){
        e.preventDefault();

        if(!productValues.image || !productValues.title
            || !productValues.category || !productValues.price
        ){
            alert('Plz all values')
            return;
        }

        dispatch(addItems({
            image: productValues.image,
            title:productValues.title,
            category:productValues.category,
            price:productValues.price
        }))

        addValues({
            image: '',
            category: '',
            title: '',
            price: ''
        })
    }

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
         <div className='bg-white w-100 p-3 rounded-[5px] flex flex-col justify-evenly'> 
             <div className='flex justify-between'>
                        <h1 className='font-bold'>Add Product</h1>
                        <button onClick={onClose}
                        className='p-1 active:bg-gray-300 rounded-full w-10'
                        >X</button>
            </div>
                <form 
                onSubmit={handleSubmit}
                className=''>
                    <div className='m-1'>
                         <p className='text-[14px] font-semibold'>Product Image</p>
                         <input 
                         name="image"
                         value={productValues.image}
                         onChange={handleValues}
                         className='border-2 border-gray-400 rounded-[3px] p-1 focus:border-orange-500 focus:outline-none w-full' placeholder='Paste Your Image Address' />
                    </div>

                     <div className='m-1'>
                         <p className='text-[14px] font-semibold'>Product Category</p>
                         {/* <input className='border-2 border-gray-400 rounded-[3px] p-1 focus:border-orange-500 focus:outline-none w-full' placeholder='Enter Your Product Name' /> */}
                          
                         <select 
                         name='category'
                         value={productValues.category}
                         onChange={handleValues}
                         className='w-full h-8 p-1 rounded-[3px] border-2 border-gray-400 focus:border-orange-500 focus:outline-none'>
                            <option value=''>Select Category</option>
                            <option value='Breakfast'>Breakfast</option>
                            <option value='MainCours'>MainCours</option>
                         </select>
                    </div>
                   
                     <div className='m-1'>
                         <p className='text-[14px] font-semibold'>Product Name</p>
                         <input 
                         name='title'
                         value={productValues.title}
                         onChange={handleValues}
                         className='border-2 border-gray-400 rounded-[3px] p-1 focus:border-orange-500 focus:outline-none w-full' placeholder='Enter Your Product Name' />
                    </div>

                     <div className='m-1'>
                         <p className='text-[14px] font-semibold'>Product Price</p>
                         <input 
                         name='price'
                         value={productValues.price}
                         onChange={handleValues}
                         className='border-2 border-gray-400 rounded-[3px] p-1 focus:border-orange-500 focus:outline-none w-full' placeholder='Enter Your Product Price' />
                    </div>
                    <button 
                    type='submit'
                    className='w-full h-10 bg-orange-500 p-1 text-white font-semibold rounded-[5px] mt-1 active:bg-orange-700'>
                        Add Product
                    </button>
                </form>
            </div>  
        </div>
    )
}

export default AddProductPop;