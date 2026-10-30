import toast , { Toaster } from 'react-hot-toast';
import { useSelector , useDispatch } from 'react-redux';
import { addCategory , getCategory  } from '../../.././redux/slicer/categorySlicer.js';
import { useEffect , useState } from 'react';
import { postCategory , fetchCategory ,  updateCategory , deleteCategory } from '../../../API/category.js';

function AddCategory(){

    const [categoryName , setCategoryName ] = useState('');
    const [isUpdate , setUpdate ] = useState(false);
    const [id , setId ] = useState(0);

    const category = useSelector(state => state.categorys.category);
    const dispatch = useDispatch()

     async function loadData(){
            try{
                   const categoryData = await fetchCategory();
                    dispatch(getCategory(categoryData));
            }catch (e){
                console.log(`useEff ${e.message}`)
            }
        }
    useEffect(() => {
        loadData();
    },[dispatch]);

    async function addCategoryData(){
        try{
               if(isUpdate){
                    editCategory(categoryName)
               }else{
                    const data = await postCategory(categoryName);
                    toast.success('Add category successfully')
                    dispatch(addCategory(data));
                    setCategoryName('')
               }
        }catch(e){
                console.log(`addCategoryData ${e.message}`)
        }
    }

    async function editCategory(category){
      const data =  await updateCategory(category,id)
      loadData();
      toast.success('Update category successfully')
      setCategoryName('')
      setUpdate(false);
    }

    return (
         <div className='flex justify-evenly'>
            <Toaster/>
                    <div className=' flex flex-col justify-evenly w-90 h-50 p-1 border border-gray-300 rounded-[5px] bg-white'>
                       <div>
                             <h1 className='font-bold ml-1'>Add New Category</h1>
                             <p className='text-[10px] font-semibold text-gray-400'>create a new  food category for your menu</p>
                       </div>
                        <div>
                            <p className='font-bold m-1 text-[12px]'>Category Name</p>
                            <input 
                             value={categoryName}
                             onChange={(e) => setCategoryName(e.target.value)}
                            className='w-full h-10 border-2 p-1 border-gray-200 focus:outline-none focus:border-amber-500   placeholder:p-2'
                            type='text' placeholder='Enter category name'  />
                        </div>
                        <button 
                        onClick={addCategoryData}
                        className='w-full h-10 bg-amber-500 mt-1 text-[13px] text-white font-semibold cursor-pointer active:bg-amber-800'>{(isUpdate) ? 'Update Category' : 'Add Product'}</button>
                    </div>
                     <div className=' flex flex-col  w-110  p-1 border border-gray-300 rounded-[5px] bg-white'>
                        <h1 className='font-bold ml-1'>Category List</h1>
                        <div>
                            <div className={'h-7 w-full bg-gray-100 flex justify-between items-center px-2 font-bold text-[10px]'}>
                                <p>#</p>
                                <p>Category Name</p>
                                <p>Action</p>
                            </div>
                            {
                                category?.map((category , index) => (<div className='h-10 w-full border border-gray-100 m-1  flex justify-between items-center px-2 text-[10px]' key={category._id}>
                                    <p>{index+1}</p>
                                    <p className='font-bold'>{category.categoryName}</p>
                                     <div className='flex justify-between items-center w-10'>
                                    <button
                                    onClick={() => handleDelete(category._id)}
                                    className='cursor-pointer'
                                    ><i className="ri-delete-bin-7-line text-red-600 text-[15px]"></i></button> 
                                    <button 
                                    className='cursor-pointer'
                                    onClick={() =>handleCategoryUpdate(category._id,category.categoryName)}><i className="ri-pencil-line text-blue-500 text-[15px]"></i></button>  
                                    </div>
                                </div>))
                            }
                        </div>
                    </div>
              </div>
    )
    function handleCategoryUpdate(id,categoryName){
        console.log('is tab')
        setUpdate(true)
        setId(id);
        setCategoryName(categoryName);
    }

    async function handleDelete(id){
        await deleteCategory(id);
        toast.success('Delete category successfully')
        loadData();
    }
}

export default AddCategory;