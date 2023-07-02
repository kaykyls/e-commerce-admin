import React from 'react'
import {FaSearch, FaPlus} from 'react-icons/fa'

const Products = () => {
    return (
        <div className='flex flex-col items-center mt-16 ms-[491px] w-full me-64 relative'>
            <div className='flex gap-2 items-center bottom-4 right-4 absolute'>
                <span className='font-medium text-lg'>Add New Product</span>
                <div className='p-4 bg-blue-700 rounded-full text-white cursor-pointer hover:bg-blue-800'>
                    <FaPlus/>
                </div>
            </div>
            
            <div className='flex flex-col items-center mt-16 w-full'>
                <div className='flex bg-slate-300 items-center rounded-lg text-lg font-medium w-full'>
                    <label className='p-4' htmlFor='product-search'>
                        <FaSearch/>
                    </label>
                    <input id='product-search' className='bg-slate-300 w-full py-4 outline-none rounded-lg placeholder:text-slate-400' type="text" placeholder='Search...'/>
                </div>
            </div>
        </div>
    )
}

export default Products