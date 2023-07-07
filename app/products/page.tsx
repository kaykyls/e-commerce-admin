import React from 'react'
import {FaSearch, FaPlus } from 'react-icons/fa'
import ProductPreview from '../components/ProductPreview'
import Link from 'next/link'

const Products = () => {
    return (
        <div className='flex flex-col items-center px-64 w-full relative'>
            <div className='flex gap-2 items-center bottom-8 right-64 absolute'>
                <span className='font-medium text-2xl'>Add New Product</span>
                <Link href={"/products/add"} className='p-6 bg-blue-700 rounded-full shadow-lg transition-colors text-white cursor-pointer hover:bg-blue-800'>
                    <FaPlus/>
                </Link>
            </div>
            
            <div className='flex flex-col items-center mt-16 w-full'>
                <div className='flex bg-slate-300 items-center rounded-lg text-lg font-medium w-full'>
                    <label className='p-4' htmlFor='product-search'>
                        <FaSearch/>
                    </label>
                    <input id='product-search' className='bg-slate-300 w-full py-4 outline-none rounded-lg placeholder:text-slate-400' type="text" placeholder='Search...'/>
                </div>
            </div>

            <div className='flex flex-col mt-8 w-full max-h-[700px] overflow-auto'>
                <ProductPreview
                    name='Product Name'
                    category='Category'
                    image='https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
                />
                <ProductPreview
                    name='Product Name'
                    category='Category'
                    image='https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
                />
                <ProductPreview
                    name='Product Name'
                    category='Category'
                    image='https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
                />
            </div>
        </div>
    )
}

export default Products