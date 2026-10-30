import  { useState , useEffect } from 'react';
import CategoryPop from './CategoryPop';

import { useSelector } from 'react-redux';

function Category(){

       const [ categoryNumber , setCategoryNumber] = useState(0)
       const category = useSelector(state => state.categorys.category);
    return (
         <div className='p-1 mt-1 mb-2 w-full flex flex-wrap items-center justify-start'>
                {
                    category?.map((cate,idx) =>(
                        <button
                        key={cate._id}  
                        onClick={() =>setCategoryNumber(idx)}
                        className={`p-2 rounded-2xl w-30 flex items-center m-1 justify-center  shadow-[0_0px_7px_rgba(0,0,0,0.15)] hover:bg-amber-200 ${categoryNumber === idx ? 'bg-amber-400 text-white':'bg-white'}`}>{cate.categoryName.charAt(0).toUpperCase() + cate.categoryName.slice(1).toLowerCase()}</button>
                    ))
                }   
            </div>
    )
}

export default Category;