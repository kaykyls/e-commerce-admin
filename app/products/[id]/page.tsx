"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { GoArrowLeft, GoUpload } from 'react-icons/go'
import { CgClose } from 'react-icons/cg'
import { FiCheck } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
    _id: string,
    title: string,
    description: string,
    price: number,
    categories: string[],
    images: {
        src: string,
        alt: string
    }[]
}

interface Category {
    _id: string,
    title: string
}

const Product = () => {
    const id = usePathname();

    const [product, setProduct] = useState<Product>();

useEffect(() => {
    getProduct();
}, [])

const getProduct = async () => {
    try {
        const response = await axios.get(`http://localhost:3333${id}`);
        setProduct(response.data);
    } catch (error) {
        console.log(error);
    }
}

const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3333/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
}; 

return (
    <div className='flex flex-col px-32 justify-center mb-16 w-full text-lg'>
        <div className='mb-4 flex items-center'>
            <Link href={"/products"}>
                <GoArrowLeft className='text-2xl' />
            </Link>
            <span className='text-2xl ml-8'>{product?.title}</span>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <label>Product Name</label>
                <div>
                    <span className='bg-white px-4 py-2 rounded-lg text-dark-gray'>{product?.title}</span>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label>Category</label>
                <div>
                {product?.categories.map((category, index) =>
                        <span className='bg-white px-4 py-2 rounded-lg text-dark-gray' key={index}>{category}</span>
                    )}
                </div>
            </div>
        </div>
    </div>
)
}

export default Product