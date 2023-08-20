"use client"

import React, { useEffect, useState } from 'react'
import {FaSearch, FaPlus } from 'react-icons/fa'
import ProductPreview from '../components/ProductPreview'
import Link from 'next/link'
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState<[]>([]);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3333/products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className='flex flex-col px-32 w-full relative flex-1'>
            <div className='flex gap-2 items-center bottom-8 right-32 absolute'>
                <span className='font-medium text-2xl'>Add New Product</span>
                <Link href={"/products/add"} className='p-6 bg-blue-700 rounded-full shadow-lg transition-colors text-white cursor-pointer hover:bg-blue-800'>
                    <FaPlus/>
                </Link>
            </div>
            <div className='mb-8'>
                <span className='text-2xl'>Products</span>
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex bg-white rounded-lg text-lg font-medium w-full'>
                    <label className='p-4' htmlFor='product-search'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>
                    </label>
                    <input id='product-search' className='bg-white w-full py-4 outline-none rounded-lg placeholder:text-slate-400' type="text" placeholder='Search...'/>
                </div>
            </div>

            <div className='flex flex-col mt-8 w-full max-h-[700px] overflow-auto'>
                {products.map((product: any) => {
                    return (
                        <ProductPreview
                            key={product._id}
                            name={product.title}
                            category={product.category}
                            image={product.images[0].src}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Products