import { useState } from 'react';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import AddTable from './AddTables';
import { useLocation } from 'react-router-dom';

function Inventory(){

   const location = useLocation();
   const item = location.state;
   console.log(item);

    const [isTab , setTab ] = useState('Product');



    function handleTab(tab){
        setTab(tab);
    }

    return (
        <div className='w-full p-2 bg-gray-50'>
                <h1 className='font-bold text-3xl'>Inventory</h1>
                <p>Manage your categories and products</p>
              <div className='flex justify-between w-100 my-4'>
                    <button 
                    onClick={() => {
                        handleTab('Product');
                    }}
                    className={`${(isTab === 'Product') ? 'border-b-3 w-30 font-bold border-amber-500 p-2 text-amber-600' :'p-2 text-black w-30'} `}>Product</button>
                    <button 
                    onClick={() => {
                        handleTab('Category');
                    }}
                    className={`${(isTab === 'Category') ?'border-b-3 w-30 font-bold border-amber-500 p-2 text-amber-600' :'p-2 text-black w-30'} `}>Category</button>
                    <button 
                    onClick={() => {
                        handleTab('Table');
                    }}
                    className={`${(isTab === 'Table') ?'border-b-3 w-30 font-bold border-amber-500 p-2 text-amber-600' :'p-2 text-black w-30'} `}>Table</button>
              </div>
              {(isTab === 'Product') && <AddProduct />}
              {(isTab === 'Category') && <AddCategory/>}
              {(isTab === 'Table') && <AddTable/>}
        </div>
    )
}

export default Inventory;