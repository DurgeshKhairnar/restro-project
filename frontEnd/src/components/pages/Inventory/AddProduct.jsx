import { useState ,useEffect } from 'react';
import { postProducts , getProducts, putProduct , deleteProduct } from '../../../API/product.js';
import { useDispatch , useSelector } from 'react-redux';
import { addItems ,getProduct , updateProduct } from '../../../redux/slicer/itemsSlicer.js';
import { addCategory , getCategory  , } from '../../.././redux/slicer/categorySlicer.js';
import { postCategory , fetchCategory } from '../../../API/category.js';
import  toast , { Toaster } from 'react-hot-toast';


function AddProduct(){

    const dispatch = useDispatch();
    const products = useSelector(state => state.items.product)
    const category = useSelector(state => state.categorys.category);

     async function loadData(){
                try{
                       const data = await getProducts();
                       const categoryData = await fetchCategory();
                       dispatch(getProduct(data.data));
                       dispatch(getCategory(categoryData));
                }catch (e){
                    console.log(`error ${e.message}`)
                }
            }

    useEffect(() => {    
            loadData();
    },[dispatch])

     const [ productValues , addValues ] = useState({
            productImage:'',
            productName:'',
            categoryName:'',
            price:'',
        })

      const [ updateToggle , setUpdateToggle ] = useState(false);
      const [ id , setId ] = useState(0);    

       function handleValues(e){
             const { name , value } = e.target;
             addValues(prev => ({...prev,[name]:value}));
         }   
     
      async   function handleSubmit(e){
             e.preventDefault();
            console.log(productValues.productImage)
            console.log(productValues.productName)
            console.log(productValues.categoryName)
            console.log(productValues.price)
             if(!productValues.productImage || !productValues.productName
                 || !productValues.categoryName || !productValues.price
             ){
                 alert('Plz all values')
                 return;
             }

             const products = {
                 productImage:productValues.productImage,
                 productName:productValues.productName,
                 categoryName:productValues.categoryName,
                 price:productValues.price
             }

             console.log(updateToggle)
            if(updateToggle){
                 try{
                    dispatch(updateProduct(products));
                  const product = await putProduct(products,id);
                  console.log(`product message == ${product.message}`);
                  toast.success(product.message);
                  loadData();
                }catch(e){
                    toast.error(e.message);
                } 
            }  else{
                try{
                dispatch(addItems(products));
                const product = await postProducts(products);
                console.log(`product message == ${product.message}`);
                toast.success(product.message); 
                }catch(e){
                    toast.error(e.message);
                } 
            }
     
             addValues({
                 productImage: '',
                 productName: '',
                 categoryName: '',
                 price: ''
             })
              setUpdateToggle(false);
         }  
         
      function editProduct(items){
        // console.log(items)
        setId(items._id)
        setUpdateToggle(true);
          addValues({
                 productImage:items.productImage,
                 productName:items.productName,
                 categoryName:items.categoryName,
                 price:items.price
             })
      } 
      
     async function removeProduct(id){
        console.log(id)
       await deleteProduct(id);
       loadData();
       toast.success('Product delete Successfully');
     }

    return (
        <div className='flex justify-evenly'>
            <Toaster/>
                    <form onSubmit={handleSubmit} className=' flex flex-col justify-evenly w-90  p-1 border border-gray-300 rounded-[5px] bg-white'>
                      <div>
                              <h1 className='font-bold ml-1'>Add New Product</h1>
                              <p className='text-[10px] font-semibold text-gray-400'>Add new product to your Inventory</p>
                      </div>
                       <div className='m-1'>
                         <p className='text-[14px] font-semibold'>Product Image</p>
                         <input 
                         name="productImage"
                         value={productValues.productImage}
                         onChange={handleValues}
                         className='border-2 border-gray-400 rounded-[3px] p-1 focus:border-orange-500 focus:outline-none w-full' placeholder='Paste Your Image Address' />
                    </div>
                    <div className='m-1'>
                         <p className='text-[14px] font-semibold'>Product Category</p>
                         {/* <input className='border-2 border-gray-400 rounded-[3px] p-1 focus:border-orange-500 focus:outline-none w-full' placeholder='Enter Your Product Name' /> */}
                          
                         <select 
                         name='categoryName'
                         value={productValues.categoryName}
                         onChange={handleValues}
                         className='w-full h-8 p-1 rounded-[3px] border-2 border-gray-400 focus:border-orange-500 focus:outline-none'>
                            <option value=''>Select Category</option>
                            {/* <option value='Breakfast'>Breakfast</option> */}
                            
                            {
                                category?.map((category,index) => (
                                    <option key={index} value={category.categoryName}>{category.categoryName}</option>
                                ))
                            }
                         </select>
                    </div>
                     <div className='m-1'>
                         <p className='text-[14px] font-semibold'>Product Name</p>
                         <input 
                         name='productName'
                         value={productValues.productName}
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
                     { (updateToggle) ? 'Update Product' :'Add Product'}
                    </button>
                    </form>
                 <div className=' flex flex-col  w-110  p-1 border border-gray-300 rounded-[5px] bg-white'>
                        <h1 className='font-bold ml-1'>Product List</h1>
                        <div>
                            <div className={'h-7 w-full bg-gray-100 flex justify-between items-center px-2 font-bold text-[10px]'}>
                                <p>#</p>
                                <p>Image</p>
                                <p>Product Name</p>
                                <p>Category</p>
                                <p>Price(₹)</p>
                                <p>Action</p>
                            </div>
                                {
                                    products?.map((items,index) => (<div key={index} className={'h-10 w-full border border-gray-100 m-1  flex justify-around items-center px-2 text-[10px]'}><p>{index+1}</p>
                                    <img className={'object-contain h-7 w-7 rounded-full'} src={items.productImage}/>
                                    <p className='font-bold'>{items.productName}</p>
                                    <p className='font-bold'>{items.categoryName}</p>
                                    <p>{items.price}</p>
                                    <div className='flex justify-between items-center w-10'>
                                        <button
                                        onClick={() => {
                                            removeProduct(items._id);
                                        }}
                                        ><i className="ri-delete-bin-7-line text-red-600 text-[15px]"></i></button>
                                        <button
                                         onClick={() => editProduct(items)}
                                        ><i className="ri-pencil-line text-blue-500 text-[15px]"></i></button>
                                    </div>
                                    </div>))
                                }
                        </div>
                    </div>
              </div>
    )
}

export default AddProduct;