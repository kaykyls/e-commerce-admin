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
        <div className='flex flex-col items-center px-32 w-full relative'>
            <div className='flex gap-2 items-center bottom-8 right-32 absolute'>
                <span className='font-medium text-2xl'>Add New Product</span>
                <Link href={"/products/add"} className='p-6 bg-blue-700 rounded-full shadow-lg transition-colors text-white cursor-pointer hover:bg-blue-800'>
                    <FaPlus/>
                </Link>
            </div>
            
            <div className='flex flex-col items-center mt-16 w-full'>
                <div className='flex bg-white items-center rounded-lg text-lg font-medium w-full'>
                    <label className='p-4' htmlFor='product-search'>
                        <FaSearch/>
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