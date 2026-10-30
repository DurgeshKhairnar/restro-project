import Search from '../Search.jsx';
import { useState , useEffect } from 'react'; 
import { getProducts } from'../../API/product.js';
import { fetchCategory } from'../../API/category.js';
import Category from '../Category.jsx';
import  { useSelector , useDispatch} from 'react-redux';
import { getProduct } from '../../redux/slicer/itemsSlicer.js';
import { getCategory } from '../../redux/slicer/categorySlicer.js';
import Carts from '../Carts.jsx';
import { addItem ,incrementItem , decrementItem } from '../../redux/slicer/cartSlicer.js';
import { useLocation } from 'react-router-dom';

function Dashboard(){
    // dispatch(updateCart(orderList[index]?.itemList));
    const location = useLocation();

    const { isEdited , orderId } = location.state ||  { isEdited : false ,  orderId: undefined };
    console.log(isEdited , orderId)
    const products = useSelector(state => state.items.product)
    const carts = useSelector(state => state.carts.cart)

    const dispatch = useDispatch();


  useEffect(() => {
        async function load(){
                 if (location.state) {
                    window.history.replaceState({}, document.title);
                }
               const data = await getProducts();
               const categoryData = await fetchCategory();
               dispatch(getProduct(data.data));
               dispatch(getCategory(categoryData));
        }
        load();
  },[])


    const [addPop , setPop] = useState(false);
 


function increment(id){
    dispatch(incrementItem(id))
}


function decrement(id){
    dispatch(decrementItem(id))
}

function addItems(item){
    dispatch(addItem(item));
}


    return(
        <div className='flex  min-h-screen w-full bg-gray-100 p-2 relative justify-between'>
            <div className='flex flex-col'>
            <Search/>
            <Category />
            <div className='w-full flex flex-wrap  '>
                    {
                        products?.map((itm,idx) =>{
                           const isCart = carts?.find(item => item._id === itm._id);
                          return (
                              <div key={idx} className='m-1 w-40 h-55  rounded-[8px] flex-col flex items-start justify-evenly p-2 border-2
                              border-gray-300 bg-white shadow-[0_0px_7px_rgba(0,0,0,0.15)] hover:border-amber-500  hover:border-2 relative'>
                                  <img src={itm.productImage} className='object-contain rounded-2xl h-25 mx-auto '/>
                                  <p className='font-bold flex-wrap text-[15px]'>{itm.productName}</p>
                                  <p className='font-semibold flex-wrap text-amber-400 text-[13px]'>{itm.price}</p>
                                { isCart ? (<div className={`w-full p-1 rounded-2xl font-semibold bg-amber-200 cursor-pointe flex justify-between items-center`}>
                                    <button className='p-1 bg-amber-400 text-white rounded-2xl w-10'
                                    onClick={() => increment(itm._id)}
                                    >+</button>
                                    {isCart.count}
                                    <button className='p-1 bg-amber-400 text-white rounded-2xl w-10'
                                    onClick={() => decrement(itm._id)}
                                    >-</button>
                                  </div> ) : (<button className={`border-none   w-full p-2 rounded-2xl font-semibold bg-amber-200 cursor-pointer active:bg-amber-600 active:text-white`}
                                  onClick={() => {
                                     addItems(itm);
                                  }}
                                  >ADD to Dish</button>)}
                              </div>
                          )
                       })
                    }
            </div>
            </div>
            <Carts isEdited={isEdited} orderId = {orderId} />
        </div>
    );
}


export default Dashboard;

